import { environment } from '../../../environments/environment';
import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-form-admin',
  imports: [MatButtonModule, RouterModule, CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './form-admin.component.html',
  styleUrls: ['./form-admin.component.css']
})
export class FormAdminComponent {
  baseUrl = environment.baseUrl;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      this.http.post(environment.apiUrl + '/auth', credentials)
      // this.http.post('https://nysekolokoback-gestion-ecole.onrender.com/api/api/auth', credentials)
  .subscribe(
    (response: any) => {
      console.log('Réponse de l\'API:', response);
      if (response && response.success) {
        localStorage.setItem('userData', JSON.stringify(response.data));
        console.log("test2: ", localStorage.getItem('userData'))
        this.router.navigate(['/back-office']);
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
