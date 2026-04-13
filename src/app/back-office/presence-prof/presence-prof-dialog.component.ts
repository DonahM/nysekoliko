import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { PresenceProfService, PresenceProf } from '../../services/presence-prof.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-presence-prof-dialog',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatTableModule, MatFormFieldModule,
    MatSelectModule, MatInputModule, MatIconModule, MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './presence-prof-dialog.component.html',
  styleUrls: ['./presence-prof-dialog.component.css']
})
export class PresenceProfDialogComponent implements OnInit {
  presences: PresenceProf[] = [];

  newPresence: PresenceProf = {
    date: '',
    heureDebut: '',
    heureFin: '',
    status: '',
    remarque: '',
    idProf: 0,
    idSchool: 0,
    idUser: 0
  };

  displayedColumns = ['heureDebut', 'heureFin', 'status', 'remarque', 'actions'];

  constructor(
    public dialogRef: MatDialogRef<PresenceProfDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { profId: number; profName: string; date: string; idSchool: number; idUser: number },
    private presenceService: PresenceProfService,
    private snackBar: MatSnackBar
  ) {
    this.newPresence.date = this.data.date;
    this.newPresence.idProf = this.data.profId;
    this.newPresence.idSchool = this.data.idSchool;
    this.newPresence.idUser = this.data.idUser;
  }

  ngOnInit() {
    this.loadPresences();
  }

  loadPresences() {
    this.presenceService.getPresences(this.data.date, this.data.idSchool).subscribe((res: any) => {
      this.presences = res.filter((p: any) => p.idProf === this.data.profId);
    });
  }

  addPresence() {
    if (!this.newPresence.heureDebut || !this.newPresence.heureFin || !this.newPresence.status) {
      this.snackBar.open("Veuillez remplir les heures et le statut", "Fermer", { duration: 3000 });
      return;
    }

    this.presenceService.savePresence(this.newPresence as PresenceProf).subscribe({
      next: (saved: any) => {
        this.presences = [...this.presences, saved];
        this.newPresence.heureDebut = '';
        this.newPresence.heureFin = '';
        this.newPresence.status = '';
        this.newPresence.remarque = '';
        this.snackBar.open("Ajouté avec succès", "Fermer", { duration: 2000, panelClass: ['success-snackbar'] });
      },
      error: () => this.snackBar.open("Erreur d'ajout", "Fermer", { duration: 3000 })
    });
  }

  removePresence(p: PresenceProf) {
    if (p.idPresence) {
      this.presenceService.deletePresence(p.idPresence).subscribe(() => {
        this.presences = this.presences.filter(x => x.idPresence !== p.idPresence);
      });
    }
  }
}
