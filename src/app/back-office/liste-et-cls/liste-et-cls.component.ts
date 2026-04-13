import { environment } from '../../../environments/environment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatOptionModule } from '@angular/material/core';
import { encodeId, decodeId } from '../../shared/utils/crypto.utils';

@Component({
  selector: 'app-liste-et-cls',
  standalone: true,
  imports: [
    MatTableModule, 
    MatPaginatorModule, 
    HttpClientModule, 
    MatIconModule, 
    RouterModule,
    CommonModule, 
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './liste-et-cls.component.html',
  styleUrls: ['./liste-et-cls.component.css']
})
export class ListeEtClsComponent implements OnInit {
  baseUrl = environment.baseUrl;
  className!: string;
  students: any[] = [];
  dataSource = new MatTableDataSource<any>(this.students);
  displayedColumns: string[] = ['voir', 'matricule', 'nom', 'note', 'coefficient', 'matiere', 'semestre', 'annee'];
  matiereForm: FormGroup;
  matieresList: any[] = [];
  semestresList: any[] = [];
  yearsList: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  apiUrl = environment.apiUrl + '/notes';

  constructor(private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder) {
    // Formulaire simple pour la soumission
    this.matiereForm = this.fb.group({});
  }

  get studentCount(): number {
    return this.students.length;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const encodedId = params['idCls'];
      const decodedId = encodedId ? decodeId(encodedId) : null;
      const idCls = decodedId ? Number(decodedId) : NaN;
      
      if (!isNaN(idCls)) {
        this.loadStudents(idCls);
      } else {
        console.error('ID Classe invalide:', params['idCls']);
      }
    });
    this.loadDropdownData();
  }

  loadDropdownData() {
    this.http.get<any[]>(environment.apiUrl + '/matieres').subscribe(data => (this.matieresList = data || []));
    this.http.get<any[]>(environment.apiUrl + '/semestres').subscribe(data => (this.semestresList = data || []));
    this.http.get<any>(environment.apiUrl + '/years-school').subscribe((res) => {
      this.yearsList = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
    });
  }

  loadStudents(idCls: number) {
    this.http.get<any[]>(`${environment.apiUrl}/class-e-students/class/${idCls}`).subscribe({
      next: (rows) => {
        this.students = (rows || []).map((item: any) => {
          const s = item?.etudiants ?? item;
          return {
            ...s,
            name: s?.name ?? s?.nom ?? '',
            surname: s?.surname ?? s?.prenom ?? '',
            idCls
          };
        });
        
        this.dataSource.data = this.students;
        this.dataSource.paginator = this.paginator;
      },
      error: () => {
        this.loadStudentsFromClassesFallback(idCls);
      }
    });

    this.http.get<any[]>(environment.apiUrl + '/classes').subscribe((classes) => {
      const selectedClass = classes.find((cls) => cls.idCls === idCls);
      if (selectedClass) {
        this.className = selectedClass.name;
      }
    });
  }

  /** Si l'API class-e-students échoue */
  private loadStudentsFromClassesFallback(idCls: number) {
    this.http.get<any[]>(environment.apiUrl + '/classes').subscribe((classes) => {
      const selectedClass = classes.find((cls) => cls.idCls === idCls);
      if (selectedClass) {
        this.students = (selectedClass.etudiants || []).map((item: any) => {
          const s = item?.etudiants ?? item;
          return {
            ...s,
            name: s?.name ?? s?.nom ?? '',
            surname: s?.surname ?? s?.prenom ?? '',
            idCls: selectedClass.idCls
          };
        });
        this.className = selectedClass.name;
        this.dataSource.data = this.students;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  onSubmit() {
    const allNotes = this.collectAllMatiereData();
    console.log('Notes collectées:', allNotes);    
    if (allNotes.length > 0) {
      this.checkForDuplicates(allNotes);
    } else {
      alert('Veuillez remplir au moins une note complète');
    }
  }

  collectAllMatiereData() {
    return this.students.map((student, index) => {
      // Récupérer les valeurs des inputs simples par leur ID
      const noteElement = document.getElementById('note' + student.idEdt) as HTMLInputElement;
      const coefficientElement = document.getElementById('coefficient' + student.idEdt) as HTMLInputElement;
      const matElement = document.getElementById('idMat' + student.idEdt) as HTMLSelectElement;
      const semElement = document.getElementById('idSem' + student.idEdt) as HTMLSelectElement;
      const schoolElement = document.getElementById('idSchool' + student.idEdt) as HTMLSelectElement;

      const note = noteElement?.value;
      const coefficient = coefficientElement?.value;
      const idMat = matElement?.value;
      const idSem = semElement?.value;
      const idSchool = schoolElement?.value;

      return {
        note: note ? parseFloat(note) : null,
        coefficient: coefficient ? parseFloat(coefficient) : null,
        idMat: idMat ? parseInt(idMat) : null,
        idSem: idSem ? parseInt(idSem) : null,
        idSchool: idSchool ? parseInt(idSchool) : null,
        idEdt: student.idEdt
      };
    }).filter(noteData => 
      noteData.note !== null && 
      noteData.coefficient !== null && 
      noteData.idMat !== null && 
      noteData.idSem !== null && 
      noteData.idSchool !== null
    );
  }

  checkForDuplicates(notesData: any[]) {
    // Filtrer les notes avec des données valides
    const validNotes = notesData.filter(note => 
      note.note && note.idMat && note.idSem && note.idSchool
    );

    if (validNotes.length === 0) {
      alert('Veuillez remplir au moins une note complète');
      return;
    }

    // D'abord, essayer de vérifier les doublons via l'API
    this.checkDuplicatesViaAPI(validNotes);
  }

  checkDuplicatesViaAPI(validNotes: any[]) {
    let hasDuplicates = false;
    const duplicateMessages: string[] = [];
    let completedChecks = 0;

    validNotes.forEach(note => {
      const duplicateCheckUrl = `${environment.apiUrl}/notes/check-duplicate/${note.idEdt}/${note.idMat}/${note.idSem}/${note.idSchool}`;
      
      this.http.get(duplicateCheckUrl).subscribe({
        next: (response: any) => {
          if (response.exists) {
            hasDuplicates = true;
            const studentName = this.students.find(s => s.idEdt === note.idEdt)?.name || 'Étudiant';
            const studentSurname = this.students.find(s => s.idEdt === note.idEdt)?.surname || '';
            const matiereName = this.matieresList.find(m => m.idMat == note.idMat)?.name || 'Matière';
            const semestreName = this.semestresList.find(s => s.idSem == note.idSem)?.name || 'Semestre';
            const yearName = this.yearsList.find(y => y.idSchool == note.idSchool)?.annee_scolaire || 'Année';
            
            duplicateMessages.push(`📚 ${studentName} ${studentSurname} - ${matiereName} (${semestreName} - ${yearName})`);
          }
        },
        error: () => {
          // Si l'API n'existe pas, utiliser la méthode de secours
          console.warn('API de vérification de doublons indisponible, utilisation de la méthode locale');
          this.checkDuplicatesLocally(validNotes);
          return;
        },
        complete: () => {
          completedChecks++;
          if (completedChecks === validNotes.length) {
            this.handleDuplicateResult(hasDuplicates, duplicateMessages, validNotes);
          }
        }
      });
    });
  }

  checkDuplicatesLocally(validNotes: any[]) {
    // Récupérer toutes les notes existantes pour comparaison
    this.http.get<any[]>(environment.apiUrl + '/notes').subscribe({
      next: (existingNotes) => {
        const duplicateMessages: string[] = [];
        let hasDuplicates = false;

        validNotes.forEach(newNote => {
          const isDuplicate = existingNotes.some(existingNote => 
            existingNote.idEdt == newNote.idEdt &&
            existingNote.idMat == newNote.idMat &&
            existingNote.idSem == newNote.idSem &&
            existingNote.idSchool == newNote.idSchool
          );

          if (isDuplicate) {
            hasDuplicates = true;
            const studentName = this.students.find(s => s.idEdt === newNote.idEdt)?.name || 'Étudiant';
            const studentSurname = this.students.find(s => s.idEdt === newNote.idEdt)?.surname || '';
            const matiereName = this.matieresList.find(m => m.idMat == newNote.idMat)?.name || 'Matière';
            const semestreName = this.semestresList.find(s => s.idSem == newNote.idSem)?.name || 'Semestre';
            const yearName = this.yearsList.find(y => y.idSchool == newNote.idSchool)?.annee_scolaire || 'Année';
            
            duplicateMessages.push(`📚 ${studentName} ${studentSurname} - ${matiereName} (${semestreName} - ${yearName})`);
          }
        });

        this.handleDuplicateResult(hasDuplicates, duplicateMessages, validNotes);
      },
      error: () => {
        // Si même la récupération des notes échoue, continuer avec l'enregistrement
        console.warn('Impossible de vérifier les doublons, poursuite de l\'enregistrement');
        this.addAllMatieres(validNotes);
      }
    });
  }

  handleDuplicateResult(hasDuplicates: boolean, duplicateMessages: string[], validNotes: any[]) {
    if (hasDuplicates && duplicateMessages.length > 0) {
      const message = `⚠️ Notes déjà existantes :\n\n${duplicateMessages.join('\n')}\n\nCes notes ne peuvent pas être ajoutées car elles existent déjà pour le même étudiant, matière, semestre et année scolaire.\n\nVoulez-vous :\n1. Modifier les notes existantes\n2. Annuler et corriger votre saisie`;
      
      if (confirm(message)) {
        // Option 1: Continuer avec les notes non-doublonnes
        const nonDuplicateNotes = validNotes.filter(note => {
          const isDuplicate = duplicateMessages.some(msg => 
            msg.includes(this.students.find(s => s.idEdt === note.idEdt)?.name || '') &&
            msg.includes(this.matieresList.find(m => m.idMat == note.idMat)?.name || '')
          );
          return !isDuplicate;
        });
        
        if (nonDuplicateNotes.length > 0) {
          this.addAllMatieres(nonDuplicateNotes);
        } else {
          alert('❌ Toutes les notes sont des doublons. Aucune note n\'a été ajoutée.');
        }
      } else {
        // Option 2: Annuler
        console.log('Ajout de notes annulé par l\'utilisateur');
      }
    } else {
      this.addAllMatieres(validNotes);
    }
  }

  addAllMatieres(notesData: any[]) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let completedRequests = 0;
    let successfulRequests = 0;
    const totalRequests = notesData.length;

    if (totalRequests === 0) {
      alert('Aucune note à enregistrer');
      return;
    }

    // Pour chaque étudiant, envoyer une requête POST individuelle
    notesData.forEach(note => {
      this.http.post(this.apiUrl, note, { headers }).subscribe(
        response => {
          console.log('Note ajoutée avec succès', response);
          completedRequests++;
          successfulRequests++;
          
          // Si toutes les requêtes sont terminées, recharger la page
          if (completedRequests === totalRequests) {
            setTimeout(() => {
              alert(`✅ ${successfulRequests} note(s) enregistrée(s) avec succès !`);
              window.location.reload();
            }, 1000); // Délai de 1 seconde pour voir le succès
          }
        },
        error => {
          console.error('Erreur lors de l\'ajout des notes', error);
          completedRequests++;
          
          // Même en cas d'erreur, recharger si toutes les requêtes sont terminées
          if (completedRequests === totalRequests) {
            setTimeout(() => {
              if (successfulRequests > 0) {
                alert(`⚠️ ${successfulRequests} note(s) enregistrée(s) avec succès, ${totalRequests - successfulRequests} erreur(s)`);
              } else {
                alert('❌ Erreur lors de l\'enregistrement des notes');
              }
              window.location.reload();
            }, 1000);
          }
        }
      );
    });
  }

  encode(id: any): string {
    return encodeId(id);
  }
}