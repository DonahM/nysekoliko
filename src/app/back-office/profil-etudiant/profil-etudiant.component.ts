import { environment } from '../../../environments/environment';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { decodeId } from '../../shared/utils/crypto.utils';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EditStudentDialogComponent } from '../edit-student-dialog/edit-student-dialog.component';
import { CommonModule } from '@angular/common';
import { BadgeDialogComponent } from '../badge-dialog/badge-dialog.component';
import { AddNoteDialogComponent } from '../add-note-dialog/add-note-dialog.component';
import { StudentNotesDialogComponent } from '../student-notes-dialog/student-notes-dialog.component';
import { ReceiptDialogComponent } from '../receipt-dialog/receipt-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TemplateRef } from '@angular/core';
// Angular common
import { NgIfContext } from '@angular/common';
// Browser location
import { Location } from '@angular/common';
// Models
import { Matiere } from '../../models/matiere.model';

@Component({
  selector: 'app-profil-etudiant',
  standalone: true,
  imports: [
    MatDialogModule, 
    MatIconModule, 
    MatButtonModule, 
    MatSortModule, 
    MatPaginatorModule, 
    HttpClientModule, 
    MatTableModule, 
    CommonModule,
    FormsModule,
    MatSelectModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './profil-etudiant.component.html',
  styleUrls: ['./profil-etudiant.component.css'],
})
export class ProfilEtudiantComponent implements OnInit {
  baseUrl = environment.baseUrl;
  studentId: string | null = null;
  student: Student | null = null;
  errorMessage: string | null = null;
  activeTab: string = 'profile'; // Nouvelle propriété pour les tabs

  displayedColumns: string[] = ['mois', 'statut', 'valeur', 'date', 'actions'];
  notesDisplayColumns: string[] = ['matiere', 'note', 'coefficient', 'noteCoef', 'appreciation', 'date', 'actions'];
  
  // Array to hold grouped ecolages and their data sources
  ecolagesByYear: { annee: string, dataSource: MatTableDataSource<Ecolage> }[] = [];
  
  // Array to hold grouped notes by year and semester
  notesByYearAndSemester: { 
    annee: string; 
    yearId: number;
    semestres: { 
      semestre: string; 
      semesterId: number;
      notes: Note[]; 
      dataSource: MatTableDataSource<Note> 
    }[] 
  }[] = [];

  // Données de référence pour les années et semestres
  yearsList: any[] = [];
  semestresList: any[] = [];

  // Filtres pour les notes
  selectedYearFilter: number | null = null;
  selectedSemesterFilter: number | null = null;
  filteredNotesByYearAndSemester: { 
    annee: string; 
    yearId: number;
    semestres: { 
      semestre: string; 
      semesterId: number;
      notes: Note[]; 
      dataSource: MatTableDataSource<Note> 
    }[] 
  }[] = [];

  // Détecter les changements de filtres pour forcer la réapplication
  private lastAppliedFilters = { year: null as number | null, semester: null as number | null };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  errorTemplate: TemplateRef<NgIfContext<Student|null>> | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private location: Location
  ) {}

  ngOnInit(): void {
    const encodedId = this.route.snapshot.paramMap.get('idEdt');
    const studentIdParam = encodedId ? decodeId(encodedId) : null;
    console.log('Param ID récupéré:', studentIdParam);

    this.studentId = studentIdParam;

    console.log("Student ID (Nom) : ", this.studentId);
    
    if (this.studentId) {
      this.fetchStudentData(this.studentId);
      this.loadYearsAndSemestres();
    } else {
      this.errorMessage = 'Nom de l’étudiant non valide.';
    }
  }

  loadYearsAndSemestres(): void {
    // Charger les années scolaires
    this.http.get<any>(environment.apiUrl + '/years-school').subscribe({
      next: (years) => {
        this.yearsList = Array.isArray(years?.data) ? years.data : (Array.isArray(years) ? years : []);
        console.log('Années scolaires chargées:', this.yearsList);
      },
      error: () => {
        console.log('Impossible de charger les années scolaires');
      }
    });

    // Charger les semestres
    this.http.get<any[]>(environment.apiUrl + '/semestres').subscribe({
      next: (semestres) => {
        this.semestresList = Array.isArray(semestres) ? semestres : [];
        console.log('Semestres chargés:', this.semestresList);
      },
      error: () => {
        console.log('Impossible de charger les semestres');
      }
    });
  }

  fetchStudentData(idEdt: string): void {
    const apiUrl = `${environment.apiUrl}/etudiants/${idEdt}`;
    this.http.get<Student>(apiUrl).subscribe({
      next: (data) => {
        if (data) {
          const studentData = { ...data };

          if (Array.isArray(studentData.years_schools) && studentData.years_schools.length > 0) {
            const sortedYears = [...studentData.years_schools].sort((a: any, b: any) => (b.id || b.idSchool || 0) - (a.id || a.idSchool || 0));
            studentData.years_schools = sortedYears[0].years_schools || sortedYears[0];
          } else if (studentData.idSchool) {
            this.fetchYearSchool(studentData.idSchool);
          }

          if (Array.isArray(studentData.classE) && studentData.classE.length > 0) {
            const sortedClasses = [...studentData.classE].sort((a: any, b: any) => (b.id || b.idCls || 0) - (a.id || a.idCls || 0));
            studentData.classE = sortedClasses[0].classE || sortedClasses[0];
          }

          this.student = studentData;
          this.cdr.detectChanges();

          console.log('Mapped Student Data:', this.student);

          if (Array.isArray(data.ecolages)) {
            const sortedEcolages = data.ecolages.sort((a, b) => b.idEco - a.idEco);
            this.groupEcolagesByYear(sortedEcolages);
          } else {
            this.ecolagesByYear = [];
          }

          // Charger les notes de l'étudiant
          this.fetchStudentNotes(data.idEdt);

          // Note: Paginator and Sort bindings will need to be handled dynamically in the template 
          // or view children since there are multiple data sources now.
        } else {
          this.errorMessage = 'Aucun étudiant trouvé.';
        }
      },
      error: () => {
        this.errorMessage = 'Impossible de charger les données de l’étudiant.';
      },
    });
  }

  groupEcolagesByYear(ecolages: Ecolage[]): void {
    const grouped = ecolages.reduce((acc, curr) => {
      const year = curr.years_schools?.annee_scolaire || 'Année non spécifiée';
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(curr);
      return acc;
    }, {} as { [key: string]: Ecolage[] });

    this.ecolagesByYear = Object.keys(grouped).map(year => {
      const dataSource = new MatTableDataSource(grouped[year]);
      return { annee: year, dataSource };
    });
  }

  fetchYearSchool(idSchool: number): void {
    const apiUrl = `${environment.apiUrl}/years-school/${idSchool}`;
    this.http.get<any>(apiUrl).subscribe({
      next: (data) => {
        if (data) {
          if (this.student) {
            this.student.years_schools = data;
          }
        }
      },
      error: () => {
        this.errorMessage = 'Impossible de récupérer l’année scolaire.';
      },
    });
  }

  openEditDialog(field: keyof Student): void {
    if (!this.student) return;

    const dialogRef = this.dialog.open(EditStudentDialogComponent, {
      data: { field, value: this.student[field] },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.status === 'saved') {
        const newValue = result.value;
        (this.student as any)[field] = newValue;
        this.updateStudent(field, newValue);
      }
    });
  }

  openAddEcolageDialog(): void {
    import('../addecolage/addecolage.component').then(({ AddecolageComponent }) => {
      const dialogRef = this.dialog.open(AddecolageComponent, {
        data: { studentId: this.student!.idEdt },
      });

      dialogRef.afterClosed().subscribe(() => {
        if (this.studentId) {
          this.fetchStudentData(this.studentId);
        }
      });
    });
  }

  openNotesDialog(): void {
    if (this.student) {
      const dialogRef = this.dialog.open(StudentNotesDialogComponent, {
        data: this.student,
      });

      dialogRef.afterClosed().subscribe(() => {
        console.log('Le pop-up a été fermé');
      });
    }
  }

  openBadgeDialog(): void {
    if (this.student) {
      const dialogRef = this.dialog.open(BadgeDialogComponent, {
        data: this.student,
      });

      dialogRef.afterClosed().subscribe(() => {
        console.log('Le pop-up a été fermé');
      });
    }
  }

  openReceiptDialog(ecolage: any): void {
    if (this.student) {
      const dialogRef = this.dialog.open(ReceiptDialogComponent, {
        width: 'auto',
        maxWidth: '95vw',
        data: {
          type: 'ecolage',
          item: ecolage,
          studentName: `${this.student.name} ${this.student.surname}`,
          className: this.student.classE?.name || this.student.idCls,
          yearName: this.student.years_schools?.annee_scolaire || ''
        }
      });
    }
  }

  // Méthodes pour le design moderne
  getStudentInitials(): string {
    if (!this.student) return '??';
    const first = this.student.name?.charAt(0) || '';
    const last = this.student.surname?.charAt(0) || '';
    return (first + last).toUpperCase();
  }

  editAllPersonal(): void {
    console.log('Edit all personal information');
    // Implémenter la logique pour éditer toutes les informations personnelles
  }

  switchTab(tab: string): void {
    this.activeTab = tab;
  }

  updateStudent(field: keyof Student, value: any): void {
    if (!this.student) return;

    const apiUrl = `${environment.apiUrl}/etudiants/${this.student.idEdt}`;
    const updateData = { [field]: value };

    this.http.patch(apiUrl, updateData).subscribe({
      next: () => {
        console.log('Mise à jour réussie');
      },
      error: () => {
        this.errorMessage = 'Impossible de mettre à jour les informations.';
      },
    });
  }

  // Méthode pour recharger la page
  reloadPage(): void {
    window.location.reload();
  }

  // Méthodes pour la gestion des notes
  fetchStudentNotes(studentId: number): void {
    // Utiliser l'endpoint des matières qui contient les notes
    const apiUrl = environment.apiUrl + '/matieres';
    this.http.get<Matiere[]>(apiUrl).subscribe({
      next: (matieres) => {
        if (Array.isArray(matieres)) {
          // Filtrer les notes pour cet étudiant spécifique
          const studentNotes = this.extractStudentNotes(matieres, studentId);
          this.groupNotesByYearAndSemester(studentNotes);
        } else {
          this.notesByYearAndSemester = [];
        }
      },
      error: () => {
        console.log('Impossible de charger les notes de l\'étudiant');
        this.notesByYearAndSemester = [];
      },
    });
  }

  extractStudentNotes(matieres: Matiere[], studentId: number): Note[] {
    const studentNotes: Note[] = [];
    
    matieres.forEach(matiere => {
      if (matiere.notes && Array.isArray(matiere.notes)) {
        matiere.notes.forEach(note => {
          if (note.idEdt === studentId) {
            // Enrichir la note avec les informations de la matière
            studentNotes.push({
              ...note,
              matiere: {
                idMat: matiere.idMat,
                name: matiere.name,
                code: matiere.code || matiere.name || ''
              }
            });
          }
        });
      }
    });
    
    return studentNotes;
  }

  groupNotesByYearAndSemester(notes: Note[]): void {
    console.log('Groupement des notes par année et semestre - notes reçues:', notes);
    
    const grouped = notes.reduce((acc, note) => {
      // Utiliser directement les IDs pour le groupement, pas les noms
      const yearId = note.idSchool;
      const semesterId = note.idSem;
      const yearKey = `annee_${yearId}`;
      const semesterKey = `semestre_${semesterId}`;
      
      if (!acc[yearKey]) {
        acc[yearKey] = {};
      }
      if (!acc[yearKey][semesterKey]) {
        acc[yearKey][semesterKey] = [];
      }
      acc[yearKey][semesterKey].push(note);
      
      return acc;
    }, {} as { [year: string]: { [semester: string]: Note[] } });

    console.log('Groupement intermédiaire:', grouped);

    this.notesByYearAndSemester = Object.keys(grouped).map(yearKey => {
      const yearId = parseInt(yearKey.replace('annee_', ''));
      const yearName = this.getYearName(yearId);
      
      return {
        annee: yearName,
        yearId: yearId,
        semestres: Object.keys(grouped[yearKey]).map(semesterKey => {
          const semesterId = parseInt(semesterKey.replace('semestre_', ''));
          const semesterName = this.getSemesterName(semesterId);
          
          return {
            semestre: semesterName,
            semesterId: semesterId,
            notes: grouped[yearKey][semesterKey].sort((a, b) => new Date(b.dateNote || '').getTime() - new Date(a.dateNote || '').getTime()),
            dataSource: new MatTableDataSource(grouped[yearKey][semesterKey])
          };
        })
      };
    });

    // Initialiser les données filtrées avec toutes les notes
    this.filteredNotesByYearAndSemester = [...this.notesByYearAndSemester];
    
    console.log('Groupement final:', this.notesByYearAndSemester);
  }

  getYearName(yearId: number): string {
    // Chercher dans les années scolaires chargées
    const year = this.yearsList.find(y => y.idSchool === yearId);
    if (year) {
      return year.annee_scolaire;
    }
    
    // Chercher dans les données de l'étudiant
    if (this.student?.years_schools && this.student.years_schools.idSchool === yearId) {
      return this.student.years_schools.annee_scolaire;
    }
    
    return `Année ${yearId}`;
  }

  getSemesterName(semesterId: number): string {
    // Chercher dans les semestres chargés
    const semester = this.semestresList.find(s => s.idSem === semesterId);
    if (semester) {
      return semester.name;
    }
    
    // Mapping par défaut
    const semesterMap: { [key: number]: string } = {
      1: 'Semestre 1',
      2: 'Semestre 2',
      3: 'Semestre 3',
      4: 'Semestre 4'
    };
    return semesterMap[semesterId] || `Semestre ${semesterId}`;
  }

  calculateSemesterAverage(notes: Note[]): number {
    if (notes.length === 0) return 0;
    
    const totalPoints = notes.reduce((sum, note) => sum + (note.note * (note.coefficient || 1)), 0);
    const totalCoefficients = notes.reduce((sum, note) => sum + (note.coefficient || 1), 0);
    
    return totalPoints / totalCoefficients;
  }

  calculateYearAverage(semestres: { semestre: string; notes: Note[] }[]): number {
    if (semestres.length === 0) return 0;
    
    const allNotes = semestres.flatMap(sem => sem.notes);
    return this.calculateSemesterAverage(allNotes);
  }

  getAppreciation(note: number): string {
    if (note >= 16) return 'Excellent';
    if (note >= 14) return 'Très bien';
    if (note >= 12) return 'Bien';
    if (note >= 10) return 'Passable';
    if (note >= 8) return 'Insuffisant';
    return 'Très insuffisant';
  }

  openAddNoteDialog(): void {
    if (!this.student) return;
    
    const dialogRef = this.dialog.open(AddNoteDialogComponent, {
      width: '450px',
      data: { 
        studentId: this.student.idEdt,
        idSchool: this.student.idSchool,
        idCls: this.student.idCls
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && this.studentId) {
        this.fetchStudentData(this.studentId);
      }
    });
  }

  editNote(note: Note): void {
    // Implémenter l'édition de note
    console.log('Éditer la note:', note);
  }

  deleteNote(note: Note): void {
    // Implémenter la suppression de note
    console.log('Supprimer la note:', note);
  }

  // Méthodes pour les filtres
  applyNotesFilters(): void {
    console.log('Application des filtres:', {
      yearFilter: this.selectedYearFilter,
      semesterFilter: this.selectedSemesterFilter,
      yearsList: this.yearsList,
      semestresList: this.semestresList,
      originalData: this.notesByYearAndSemester,
      lastApplied: this.lastAppliedFilters
    });

    // Vérifier si les filtres ont changé
    const filtersChanged = 
      this.lastAppliedFilters.year !== this.selectedYearFilter || 
      this.lastAppliedFilters.semester !== this.selectedSemesterFilter;

    if (!filtersChanged && this.filteredNotesByYearAndSemester.length > 0) {
      console.log('Filtres inchangés, application annulée');
      return; // Ne pas réappliquer si rien n'a changé
    }

    if (!this.selectedYearFilter && !this.selectedSemesterFilter) {
      // Si aucun filtre, afficher toutes les notes
      this.filteredNotesByYearAndSemester = [...this.notesByYearAndSemester];
      this.lastAppliedFilters = { year: this.selectedYearFilter, semester: this.selectedSemesterFilter };
      console.log('Aucun filtre - affichage de toutes les notes');
      return;
    }

    const filtered = this.notesByYearAndSemester.map(yearGroup => {
      // Filtrer par année si sélectionnée (utiliser yearId stocké)
      const yearMatches = !this.selectedYearFilter || yearGroup.yearId === this.selectedYearFilter;

      console.log('Vérification année:', {
        selectedYearId: this.selectedYearFilter,
        yearGroupId: yearGroup.yearId,
        yearGroupName: yearGroup.annee,
        yearMatches: yearMatches
      });

      if (!yearMatches) {
        return null; // Exclure cette année
      }

      // Filtrer les semestres dans cette année (utiliser semesterId stocké)
      const filteredSemestres = yearGroup.semestres.map(semGroup => {
        const semesterMatches = !this.selectedSemesterFilter || semGroup.semesterId === this.selectedSemesterFilter;

        console.log('Vérification semestre:', {
          selectedSemesterId: this.selectedSemesterFilter,
          semGroupId: semGroup.semesterId,
          semGroupName: semGroup.semestre,
          semesterMatches: semesterMatches
        });

        if (!semesterMatches) {
          return null; // Exclure ce semestre
        }

        return semGroup;
      }).filter(sem => sem !== null); // Garder seulement les semestres qui correspondent

      return {
        ...yearGroup,
        semestres: filteredSemestres
      };
    }).filter(year => year !== null); // Garder seulement les années qui ont des semestres

    // Mettre à jour les derniers filtres appliqués
    this.lastAppliedFilters = { year: this.selectedYearFilter, semester: this.selectedSemesterFilter };
    
    console.log('Résultat du filtrage:', filtered);
    this.filteredNotesByYearAndSemester = filtered;

    // Forcer la détection de changements Angular
    this.cdr.detectChanges();
  }

  clearNotesFilters(): void {
    console.log('Effacement des filtres');
    this.selectedYearFilter = null;
    this.selectedSemesterFilter = null;
    this.filteredNotesByYearAndSemester = [...this.notesByYearAndSemester];
    
    // Mettre à jour les derniers filtres appliqués
    this.lastAppliedFilters = { year: null, semester: null };
    
    // Forcer la détection de changements Angular
    this.cdr.detectChanges();
  }

  // Méthodes pour les calculs d'écolage
  getTotalEcolageForYear(group: any): number {
    if (!group.dataSource || !group.dataSource.data) {
      return 0;
    }
    return group.dataSource.data.reduce((total: number, ecolage: any) => {
      return total + (ecolage.valeur || 0);
    }, 0);
  }

  getPaidEcolageForYear(group: any): number {
    if (!group.dataSource || !group.dataSource.data) {
      return 0;
    }
    return group.dataSource.data.reduce((total: number, ecolage: any) => {
      return total + (ecolage.statut === 'Payé' ? (ecolage.valeur || 0) : 0);
    }, 0);
  }

  getRemainingEcolageForYear(group: any): number {
    const total = this.getTotalEcolageForYear(group);
    const paid = this.getPaidEcolageForYear(group);
    return total - paid;
  }

  editEcolage(ecolage: any): void {
    // Implémenter l'édition d'écolage
    console.log('Éditer écolage:', ecolage);
  }

  deleteEcolage(ecolage: any): void {
    // Implémenter la suppression d'écolage
    console.log('Supprimer écolage:', ecolage);
  }
}

export interface Student {
  matricule: any;
  idEdt: number;
  name: string;
  surname: string;
  date_naiss: string;
  lieu_naiss: string;
  sexe: string;
  tel: string;
  adress_edt: string;
  father: string;
  jobs_f: string;
  mother: string;
  jobs_m: string;
  tel_parent: string;
  adresse_parent: string;
  titeur: string;
  tel_titeur: string;
  adress_titeur: string;
  ecole_anter: string;
  image: string;
  idCls?: number;
  classE?: any;
  idSchool?: number;
  years_schools?: any;
  ecolages?: {
    mois: string;
    valeur: number;
    statut: string;
    date: string;
  };
}

export interface Ecolage {
  idEco: number;
  mois: string;
  valeur: number;
  statut: string;
  date: string;
  idEdt: number;
  idSchool: number;
  years_schools?: {
    idSchool: number;
    annee_scolaire: string;
  };
}

export interface Note {
  idNot: number;
  note: number;
  coefficient: number;
  idEdt: number;
  idMat: number;
  idSchool: number;
  idSem: number;
  idCls: number;
  matiere?: {
    idMat: number;
    name: string;
    code: string;
  };
  dateNote?: string;
}
