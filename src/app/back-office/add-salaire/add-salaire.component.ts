import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterModule, Router } from '@angular/router';
import {  FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-salaire',
  templateUrl: './add-salaire.component.html',
  styleUrl: './add-salaire.component.css',
  imports: [
    ReactiveFormsModule,  // Ajoute ReactiveFormsModule pour les formulaires réactifs
    CommonModule,         // Ajoute CommonModule pour les directives Angular comme ngIf, ngFor
    HttpClientModule,   // Ajoute HttpClientModule pour effectuer des appels API
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    RouterModule
  ]
})
export class AddSalaireComponent {
  baseUrl = environment.baseUrl;
  matiereForm: FormGroup;
  apiUrl = environment.apiUrl + '/salaires';
  anneesScolaires: Array<{ idSchool: number; annee_scolaire: string }> = []; // Récupère depuis l'API
  allProfesseurs: any[] = [];
  professeur: any[] = [];

  yersStudent = {
    idSchool: null as number | null
  };

  form = new FormGroup({
    idCls: new FormControl(null, [Validators.required]),
  })
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.matiereForm = this.fb.group({
      mois: ['', [Validators.required, Validators.maxLength(225)]],
      statut: ['', [Validators.required, Validators.maxLength(225)]],
      valeur: ['', [Validators.required, Validators.maxLength(225)]],
      date: ['', [Validators.required, Validators.maxLength(225)]],
      idProf: ['', Validators.required],
      idSchool: ['', Validators.required],
      heures_totales: [''],
      calcStart: [''],
      calcEnd: ['']
    });
  }

  months: string[] = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  

  onSubmit() {
    if (this.matiereForm.valid) {
      const matiereData = this.matiereForm.value;
      this.addMatiere(matiereData);
    } else {
      console.log('Le formulaire est invalide');
    }
  }

  ngOnInit(): void {
    this.getAnneesScolaires();
    this.getProfesseur();

    // Filtre les professeurs selon l'année choisie
    this.matiereForm.get('idSchool')?.valueChanges.subscribe(selectedSchoolId => {
      if (selectedSchoolId) {
        this.professeur = this.allProfesseurs.filter(p => p.idSchool === selectedSchoolId);
        
        // Réinitialise le prof choisi si non valide dans la nouvelle liste
        const currentProfId = this.matiereForm.get('idProf')?.value;
        if (currentProfId && !this.professeur.find(p => p.idProf === currentProfId)) {
          this.matiereForm.get('idProf')?.setValue('');
        }
      } else {
        this.professeur = [...this.allProfesseurs];
      }
    });
  }

  getAnneesScolaires(): void {
    this.http.get<{ data: any[], total: number }>(environment.apiUrl + '/years-school')
      .subscribe({
        next: (response) => {
          console.log('Données récupérées :', response);
          this.anneesScolaires = response.data; // 👈 Utilise directement le tableau
        },
        error: (error) => {
          console.error("Erreur lors de la récupération des années scolaires :", error);
        }
      });
  }

  getProfesseur(): void {
    this.http.get<any[]>(environment.apiUrl + '/professeurs') 
      .subscribe({
        next: (response) => {
          this.allProfesseurs = response; 
          
          // Si une année est déjà sélectionnée, on filtre immédiatement
          const currentSchoolId = this.matiereForm.get('idSchool')?.value;
          if (currentSchoolId) {
            this.professeur = this.allProfesseurs.filter(p => p.idSchool === currentSchoolId);
          } else {
            this.professeur = [...response];
          }
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des prof :', error);
        }
      });
  }

  // Fonction pour envoyer les données vers l'API
  addMatiere(matiereData: any) {
    this.http.post(this.apiUrl, matiereData).subscribe(
      response => {
        console.log('salaire ajoutée avec succès', response);
        this.router.navigate(['/back-office/tablesalaire']);
      },
      error => {
        console.error('Erreur lors de l\'ajout de la salaire', error);
      }
    );
  }

  calculerSalaireFromPresence() {
    const idProf = this.matiereForm.get('idProf')?.value;
    const start = this.matiereForm.get('calcStart')?.value;
    const end = this.matiereForm.get('calcEnd')?.value;

    if (!idProf || !start || !end) {
      alert('Veuillez sélectionner un professeur, une date de début et une date de fin pour le calcul.');
      return;
    }

    this.http.get<any>(`${environment.apiUrl}/salaires/calcul/${idProf}?start=${start}&end=${end}`)
      .subscribe({
        next: (res) => {
          console.log('Résultat calcul :', res);
          this.matiereForm.patchValue({
            valeur: res.montant_calcule,
            heures_totales: res.heures_totales
          });
          alert(`Calcul réussi : ${res.heures_totales} heures trouvées au taux de ${res.taux_horaire} Ar/h.`);
        },
        error: (err) => {
          console.error('Erreur calcul :', err);
          alert('Impossible de calculer le salaire. Vérifiez la connexion ou si le professeur a des présences.');
        }
      });
  }
}
