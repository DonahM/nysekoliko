import { environment } from '../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-form-prof',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatButtonModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './add-form-prof.component.html',
  styleUrl: './add-form-prof.component.css'
})
export class AddFormProfComponent implements OnInit {
  baseUrl = environment.baseUrl;
  errorMessage: string | null = null;
  yearsSchools: Array<{ idSchool: number; annee_scolaire: string }> = [];

  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit(): void {
    this.loadYearsSchools();
  }

  loadYearsSchools(): void {
    this.http.get<{ data: { idSchool: number; annee_scolaire: string }[] }>(environment.apiUrl + '/years-school').subscribe({
      next: (response) => {
        console.log('Données reçues pour yearsSchools:', response);
        this.yearsSchools = response.data;  // Assurez-vous que vous utilisez la propriété 'data'
      },
      error: (error) => console.error('Erreur lors du chargement des années scolaires:', error),
    });
  }
  
  

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    const userDataStr = localStorage.getItem('userData');
    let userId = null;
    if (userDataStr) {
      const userData = JSON.parse(userDataStr);
      userId = userData.idUser;
    }

    const newProf = {
      name: form.value.name,
      surname: form.value.surname,
      matiere: form.value.matiere,
      idSchool: form.value.anneeScolaire,
      idUser: userId,
      email: form.value.email || null,
      telephone: form.value.telephone || null,
      specialite: form.value.specialite || null,
      experience: form.value.experience || null,
      biographie: form.value.biographie || null
    };

    // Envoi des données à l'API
    this.http.post(environment.apiUrl + '/professeurs', newProf).subscribe({
      next: () => {
        console.log('Professeur ajouté avec succès');
        this.router.navigate(['/back-office/prof']); // Retour à la liste
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout du professeur:', error);
        this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
      }
    });
  }

  onCancel() {
    this.router.navigate(['/back-office/prof']); // Redirige vers la liste
  }
}
