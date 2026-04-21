import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { environment } from '../../../../environments/environment';

export interface MatiereDialogData {
  matiereName: string;
  idUser: number;
  anneesScolaires: any[];
}

@Component({
  selector: 'app-matiere-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    HttpClientModule
  ],
  templateUrl: './matiere-dialog.component.html',
  styleUrls: ['./matiere-dialog.component.css']
})
export class MatiereDialogComponent {
  selectedYear: number | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(
    public dialogRef: MatDialogRef<MatiereDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatiereDialogData,
    private http: HttpClient
  ) {}

  onSave(): void {
    if (!this.selectedYear) {
      this.errorMessage = 'Veuillez sélectionner une année scolaire';
      return;
    }

    this.isLoading = true;
    const payload = {
      name: this.data.matiereName,
      idSchool: this.selectedYear,
      idUser: this.data.idUser
    };

    this.http.post(environment.apiUrl + '/matieres', payload).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = "Erreur lors de la réinscription de la matière";
        console.error(err);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
