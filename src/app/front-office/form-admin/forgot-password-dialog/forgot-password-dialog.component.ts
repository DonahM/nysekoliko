import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../../environments/environment';
import { ClipboardModule } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-forgot-password-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ClipboardModule
  ],
  templateUrl: './forgot-password-dialog.component.html',
  styleUrls: ['./forgot-password-dialog.component.css']
})
export class ForgotPasswordDialogComponent {
  emailForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  newPasswordGenerated = '';
  copied = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public dialogRef: MatDialogRef<ForgotPasswordDialogComponent>
  ) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.emailForm.invalid) {
      this.errorMessage = 'Veuillez saisir une adresse email valide.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    const payload = { email: this.emailForm.value.email };

    this.http.post<{ password?: string }>(environment.apiUrl + '/user/resend-password', payload).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res && res.password) {
          this.newPasswordGenerated = res.password;
        } else {
          this.errorMessage = 'Une erreur inattendue est survenue.';
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Cette adresse email na pas pu être trouvée.';
        console.error(err);
      }
    });
  }

  copyPassword(): void {
    if (this.newPasswordGenerated) {
      // The cdkCopyToClipboard directive handles the copying, this method is just to change state
      this.copied = true;
      setTimeout(() => this.copied = false, 2000);
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
