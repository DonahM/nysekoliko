import { environment } from '../../../environments/environment';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-student-id-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './student-id-dialog.component.html',
  styleUrls: ['./student-id-dialog.component.css']
})
export class StudentIdDialogComponent implements OnInit {
  baseUrl = environment.baseUrl;
  classEStudent = {
    idCls: null as number | null
  };

  allClasses: any[] = [];
  classeEtudiants: any[] = [];
  anneesScolaires: any[] = [];
  selectedYearId: number | null = null;

  constructor(
    public dialogRef: MatDialogRef<StudentIdDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getAnneesScolaires();
    this.getClasses();
  }

  getAnneesScolaires(): void {
    this.http.get<{ data: any[], total: number }>(environment.apiUrl + '/years-school')
      .subscribe({
        next: (res) => {
          this.anneesScolaires = res.data;
        },
        error: (error) => {
          console.error("Erreur chargement des années scolaires :", error);
        }
      });
  }

  getClasses(): void {
    this.http.get<any[]>(environment.apiUrl + '/classes')
      .subscribe({
        next: (response) => {
          this.allClasses = response;
          this.classeEtudiants = []; // Initialement vide car aucune année n'est sélectionnée
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des classes :', error);
        }
      });
  }

  onYearChange(): void {
    this.classEStudent.idCls = null;
    if (this.selectedYearId) {
      this.classeEtudiants = this.allClasses.filter(c => c.idSchool === this.selectedYearId);
    } else {
      this.classeEtudiants = [];
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const payload = {
        idCls: Number(this.classEStudent.idCls),
        idEdt: Number(this.data.id)
      };

      this.http.post(environment.apiUrl + '/class-e-students', payload)
        .subscribe({
          next: (response) => {
            console.log('Données envoyées avec succès :', response);
            this.dialogRef.close(response);
          },
          error: (error) => {
            console.error('Erreur lors de l’envoi des données :', error);
          }
        });
    }
  }
}
