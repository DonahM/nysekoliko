import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-semestre',
  templateUrl: './add-semestre.component.html',
  styleUrl: './add-semestre.component.css',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class AddSemestreComponent implements OnInit {
  baseUrl = environment.baseUrl;
  matiereForm: FormGroup;
  apiUrl = environment.apiUrl + '/semestres';
  yearsSchools: Array<{ idSchool: number; annee_scolaire: string }> = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.matiereForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(225)]],
      idSchool: ['', Validators.required]
    });
  }

  currentUser: any = null;

  ngOnInit(): void {
    const userData = localStorage.getItem('userData');
    if (userData) {
      this.currentUser = JSON.parse(userData);
    }
    this.loadYearsSchools();
  }

  loadYearsSchools(): void {
    this.http.get<{ data: { idSchool: number; annee_scolaire: string }[] }>(environment.apiUrl + '/years-school').subscribe({
      next: (response) => {
        this.yearsSchools = response.data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des années scolaires:', error);
      }
    });
  }

  onSubmit() {
    if (this.matiereForm.valid) {
      const matiereData = {
        ...this.matiereForm.value,
        idUser: this.currentUser?.idUser
      };
      this.AddSemestre(matiereData);
    } else {
      console.log('Le formulaire est invalide');
    }
  }
  
  AddSemestre(matiereData: any) {
    this.http.post(this.apiUrl, matiereData).subscribe(
      response => {
        console.log('semestre ajoutée avec succès', response);
        alert('Semestre ajouté avec succès!');
        this.matiereForm.reset();
      },
      error => {
        console.error('Erreur lors de l\'ajout de la semestre', error);
        alert('Erreur lors de l\'ajout du semestre');
      }
    );
  }
}
