import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { environment } from '../../../environments/environment';
import { ProfileDialogComponent } from './profile-dialog/profile-dialog.component';

@Component({
  selector: 'app-parametres',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.css']
})
export class ParametresComponent implements OnInit {
  passwordForm: FormGroup;
  isLoading = false;
  successMessage = '';
  errorMessage = '';
  userId: number | null = null;
  hideActual = true;
  hideNew = true;
  hideConfirm = true;
  userDataContext: any = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private dialog: MatDialog) {
    this.passwordForm = this.fb.group({
      actualPassword: ['', [Validators.required, Validators.minLength(4)]],
      newPassword: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    const userDataStr = localStorage.getItem('userData');
    if (userDataStr) {
      this.userDataContext = JSON.parse(userDataStr);
      this.userId = this.userDataContext.idUser;
    }
  }

  openProfileDialog() {
    this.dialog.open(ProfileDialogComponent, {
      width: '450px',
      data: this.userDataContext
    });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('newPassword')?.value === g.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.passwordForm.invalid) {
      if (this.passwordForm.errors?.['mismatch']) {
        this.errorMessage = 'Les mots de passe ne correspondent pas.';
      } else {
        this.errorMessage = 'Veuillez remplir correctement tous les champs.';
      }
      return;
    }

    if (!this.userId) {
      this.errorMessage = 'Utilisateur non identifié.';
      return;
    }

    this.isLoading = true;
    const payload = {
      actualPassword: this.passwordForm.value.actualPassword,
      newPassword: this.passwordForm.value.newPassword
    };

    const apiUrl = environment.apiUrl + '/user/' + this.userId + '/reset-password';
    
    this.http.patch(apiUrl, payload).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.successMessage = 'Votre mot de passe a été mis à jour avec succès.';
        this.passwordForm.reset();
        Object.keys(this.passwordForm.controls).forEach(key => {
          this.passwordForm.get(key)?.setErrors(null);
        });
      },
      error: (err) => {
        this.isLoading = false;
        if (err.status === 400 || err.status === 403 || err.status === 401) {
             this.errorMessage = 'Le mot de passe actuel est incorrect.';
        } else {
             this.errorMessage = 'Erreur lors du changement de mot de passe.';
        }
        console.error(err);
      }
    });
  }
}
