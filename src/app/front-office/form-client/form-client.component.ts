import { environment } from '../../../environments/environment';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { encodeId } from '../../shared/utils/crypto.utils';

@Component({
  selector: 'app-form-client',
  imports: [MatButtonModule, RouterModule, CommonModule, ReactiveFormsModule, HttpClientModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './form-client.component.html',
  styleUrl: './form-client.component.css'
})
export class FormClientComponent {
  baseUrl = environment.baseUrl;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      idEdt: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;

      this.http.post(environment.apiUrl + '/auth-client/authenticate', credentials)
      // this.http.post('https://nysekolokoback-gestion-ecole.onrender.com/api/auth-client/authenticate', credentials)
  .subscribe(
    (response: any) => {
      console.log('Réponse de l\'API:', response);
      if (response && response.success) {
        localStorage.setItem('usersData', JSON.stringify(response.data));
        this.router.navigate(['/front-office/client', encodeId(response.data.idEdt)]);
      } else {
        alert('Authentification échouée. Veuillez vérifier vos informations.');
      }
    },
    error => {
      console.error('Erreur HTTP:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    }
  );

    }
  }
}
