import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { environment } from '../../../../environments/environment';

export interface EditMatiereDialogData {
  matiere: any;
  anneesScolaires: any[];
}

@Component({
  selector: 'app-edit-matiere-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule
  ],
  templateUrl: './edit-matiere-dialog.component.html'
})
export class EditMatiereDialogComponent implements OnInit {
  matiereName: string = '';
  selectedYear: number | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(
    public dialogRef: MatDialogRef<EditMatiereDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditMatiereDialogData,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.matiereName = this.data.matiere.name;
    this.selectedYear = this.data.matiere.idSchool;
  }

  onSave(): void {
    if (!this.matiereName || !this.selectedYear) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }

    this.isLoading = true;
    const payload = {
      name: this.matiereName,
      idSchool: this.selectedYear
    };

    this.http.patch(environment.apiUrl + '/matieres/' + this.data.matiere.idMat, payload).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = "Erreur lors de la modification de la matière";
        console.error(err);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
