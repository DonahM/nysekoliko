import { environment } from '../../../environments/environment';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-note-dialog',
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
  templateUrl: './add-note-dialog.component.html',
  styleUrls: ['./add-note-dialog.component.css']
})
export class AddNoteDialogComponent implements OnInit {
  baseUrl = environment.baseUrl;
  matieres: any[] = [];
  semestres: any[] = [];
  noteModel = {
    note: null,
    coefficient: 1,
    idMat: null,
    idSem: null
  };
  isLoading = false;
  errorMessage = '';

  constructor(
    public dialogRef: MatDialogRef<AddNoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { studentId: number; idSchool: number; idCls: number },
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.fetchMatieres();
    this.fetchSemestres();
  }

  fetchMatieres(): void {
    this.http.get<any[]>(environment.apiUrl + '/matieres').subscribe({
      next: (res) => {
        this.matieres = res;
      },
      error: () => {
        console.error('Erreur chargement matières');
      }
    });
  }

  fetchSemestres(): void {
    this.http.get<any[]>(environment.apiUrl + '/semestres').subscribe({
      next: (res) => {
        this.semestres = res;
      },
      error: () => {
        console.error('Erreur chargement semestres');
      }
    });
  }

  onSave(): void {
    if (this.noteModel.note === null || !this.noteModel.idMat || !this.noteModel.idSem) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires';
      return;
    }

    this.isLoading = true;
    const payload = {
      note: Number(this.noteModel.note),
      coefficient: Number(this.noteModel.coefficient),
      idEdt: this.data.studentId,
      idMat: this.noteModel.idMat,
      idSchool: this.data.idSchool,
      idSem: this.noteModel.idSem,
      idCls: this.data.idCls || 1 // Fallback in case class is not provided directly
    };

    this.http.post(environment.apiUrl + '/notes', payload).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.dialogRef.close(true); // Return success
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = "Erreur lors de l'ajout de la note";
        console.error(err);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
