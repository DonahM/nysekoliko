import { environment } from '../../../environments/environment';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http'; 
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';  

@Component({
  selector: 'app-matiere',
  standalone: true, 
  templateUrl: './matiere.component.html',
  styleUrls: ['./matiere.component.css'],
  imports: [
    ReactiveFormsModule,  
    CommonModule,         
    HttpClientModule      
  ]
})
export class MatiereComponent {
  baseUrl = environment.baseUrl;
  matiereForm: FormGroup;
  apiUrl = environment.apiUrl + '/matieres';
  currentUser: any;
  yearsList: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.matiereForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(225)]],
      idSchool: ['', Validators.required]
    });
    
    this.checkUserConnection();
    this.loadYears();
  }

  loadYears() {
    this.http.get<any>(environment.apiUrl + '/years-school').subscribe((res) => {
      this.yearsList = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
    });
  }

  checkUserConnection(): void {
    const userData = localStorage.getItem('userData');

    if (!userData) {
      alert('Utilisateur non connecté. Veuillez vous reconnecter.');
      this.router.navigate(['/front-office/form-client']);
      return;
    }

    this.currentUser = JSON.parse(userData);
    console.log('Utilisateur connecté :', this.currentUser);
  }

  onSubmit() {
    if (this.matiereForm.valid) {
      const matiereData = {
        ...this.matiereForm.value,
        idSchool: parseInt(this.matiereForm.value.idSchool, 10),
        idUser: this.currentUser.idUser
      };
      
      this.addMatiere(matiereData);
    } else {
      console.log('Le formulaire est invalide');
    }
  }
  addMatiere(matiereData: any) {
    this.http.post(this.apiUrl, matiereData).subscribe(
      response => {
        console.log('Matière ajoutée avec succès', response);
        this.matiereForm.reset();
        alert('Matière ajoutée avec succès!');
      },
      error => {
        console.error('Erreur lors de l\'ajout de la matière', error);
        alert('Erreur lors de l\'ajout de la matière');
      }
    );
  }
}
