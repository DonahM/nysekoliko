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

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.matiereForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(225)]],
      idSchool: [{value: '', disabled: true}, Validators.required]
    });
    
    this.checkUserConnection();
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
    
    // Pré-remplir automatiquement l'idSchool avec l'idUser de l'utilisateur connecté
    if (this.currentUser && this.currentUser.idUser && this.matiereForm) {
      this.matiereForm.patchValue({
        idSchool: this.currentUser.idUser
      });
    }
  }

  onSubmit() {
    if (this.matiereForm.valid) {
      // Activer le champ idSchool temporairement pour l'envoi
      this.matiereForm.get('idSchool')?.enable();
      
      const matiereData = {
        ...this.matiereForm.value,
        idUser: this.currentUser.idUser,
        idSchool: this.currentUser.idUser
      };
      
      this.addMatiere(matiereData);
      
      // Désactiver à nouveau le champ après l'envoi
      this.matiereForm.get('idSchool')?.disable();
    } else {
      console.log('Le formulaire est invalide');
    }
  }
  addMatiere(matiereData: any) {
    this.http.post(this.apiUrl, matiereData).subscribe(
      response => {
        console.log('Matière ajoutée avec succès', response);
        this.matiereForm.reset();
        // Réactiver et pré-remplir idSchool après reset
        this.matiereForm.get('idSchool')?.enable();
        this.matiereForm.patchValue({
          idSchool: this.currentUser.idUser
        });
        this.matiereForm.get('idSchool')?.disable();
        alert('Matière ajoutée avec succès!');
      },
      error => {
        console.error('Erreur lors de l\'ajout de la matière', error);
        alert('Erreur lors de l\'ajout de la matière');
      }
    );
  }
}
