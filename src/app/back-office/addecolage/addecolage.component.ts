import { environment } from '../../../environments/environment';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-addecolage',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule,
  ],
  templateUrl: './addecolage.component.html',
  styleUrl: './addecolage.component.css'
})
export class AddecolageComponent implements OnInit {
  baseUrl = environment.baseUrl;
  ecolageForm: FormGroup;
  studentId: number;
  statusOptions = ['Payer', 'Non Payer'];
  student: any = null;
  anneeScolaire: string = '';
  yearsSchools: any[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public dialogRef: MatDialogRef<AddecolageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { studentId: number }
  ) {
    this.studentId = data.studentId;
    this.ecolageForm = this.fb.group({
      mois: ['', Validators.required],
      valeur: [0, [Validators.required, Validators.min(1)]],
      statut: ['Payer', Validators.required],
      date: ['', Validators.required],
      // idEdt: ['', Validators.required],
      idSchool: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadStudentData();
    this.loadYearsSchools();
  }

  loadYearsSchools(): void {
    this.http.get<{ data: any[] }>(`${environment.apiUrl}/years-school`).subscribe({
      next: (response) => {
        this.yearsSchools = response.data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des années scolaires :', error);
      },
    });
  }

  loadStudentData(): void {
    this.http.get(`${environment.apiUrl}/etudiants/${this.studentId}`).subscribe({
      next: (studentData: any) => {
        this.student = studentData;
        this.anneeScolaire = studentData.anneeScolaire || '';
        // Pré-remplir le champ idSchool avec l'année scolaire
        // Assurez-vous d'utiliser idSchool car le select s'attend à l'identifiant (nombre)
        const idSchool = studentData.idSchool || studentData.anneeScolaire || '';
        this.ecolageForm.patchValue({
          idSchool: idSchool
        });
      },
      error: (err) => {
        console.error('Erreur lors du chargement des données de l\'étudiant:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.ecolageForm.valid) {
      const newEcolage = { 
        ...this.ecolageForm.value,
        idEdt: this.studentId, 
        // idSchool: 1 // Remplace cette valeur avec l'ID de l'école, si nécessaire.
      };

      this.http.post(environment.apiUrl + '/ecolages', newEcolage).subscribe({
        next: () => {
          this.dialogRef.close(true); // Ferme le pop-up et indique que l'ajout a réussi
        },
        error: () => {
          alert('Erreur lors de l\'ajout de l\'écolage');
        },
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false); // Ferme le pop-up sans enregistrer
  }
}
