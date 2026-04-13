import { environment } from '../../../environments/environment';
import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-emploi-du-temps-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './emploi-du-temps-dialog.component.html',
  styleUrls: ['./emploi-du-temps-dialog.component.css']
})
export class EmploiDuTempsDialogComponent implements OnInit {
  baseUrl = environment.baseUrl;
  matieres: any[] = [];
  professeurs: any[] = [];
  daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

  slotModel = {
    jour: '',
    heureDebut: '',
    heureFin: '',
    idMat: null,
    idProf: null
  };

  isLoading = false;
  errorMessage = '';

  constructor(
    public dialogRef: MatDialogRef<EmploiDuTempsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { idSchool: number; idCls: number },
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.fetchMatieres();
    this.fetchProfesseurs();
  }

  fetchMatieres(): void {
    this.http.get<any[]>(environment.apiUrl + '/matieres').subscribe({
      next: (res) => { this.matieres = res || []; },
      error: () => console.error('Erreur de chargement matières')
    });
  }

  fetchProfesseurs(): void {
    this.http.get<any[]>(environment.apiUrl + '/professeurs').subscribe({
      next: (res) => { this.professeurs = res || []; },
      error: () => console.error('Erreur de chargement professeurs')
    });
  }

  onSave(): void {
    if (!this.slotModel.jour || !this.slotModel.heureDebut || !this.slotModel.heureFin || !this.slotModel.idMat || !this.slotModel.idProf) {
      this.errorMessage = 'Tous les champs sont obligatoires';
      return;
    }

    // Validation des heures
    if (this.slotModel.heureDebut >= this.slotModel.heureFin) {
      this.errorMessage = "L'heure de fin doit être après l'heure de début";
      return;
    }

    this.isLoading = true;
    const payload = {
      jour: this.slotModel.jour,
      heureDebut: this.slotModel.heureDebut,
      heureFin: this.slotModel.heureFin,
      idMat: Number(this.slotModel.idMat),
      idProf: Number(this.slotModel.idProf),
      idCls: Number(this.data.idCls),
      idSchool: Number(this.data.idSchool)
    };

    this.http.post(environment.apiUrl + '/emploi-du-temps', payload).subscribe({
      next: () => {
        this.isLoading = false;
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Erreur lors de la création du créneau';
        console.error(err);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
