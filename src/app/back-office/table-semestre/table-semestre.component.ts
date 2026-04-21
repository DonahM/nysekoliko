import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SemestreDialogComponent } from './semestre-dialog/semestre-dialog.component';

@Component({
  selector: 'app-table-semestre',
  standalone: true,
  imports: [
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    RouterModule,
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    MatTooltipModule
  ],
  templateUrl: './table-semestre.component.html',
  styleUrl: './table-semestre.component.css',
})
export class TableSemestreComponent implements OnInit {
  baseUrl = environment.baseUrl;
  displayedColumns: string[] = ['name', 'idSchool', 'actions'];
  dataSource: MatTableDataSource<Semestre> = new MatTableDataSource<Semestre>([]);
  errorMessage: string | null = null;
  userId: number | null = null;
  anneesScolaires: Array<{ idSchool: number; annee_scolaire: string }> = [];

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    const userData = localStorage.getItem('userData');
    if (userData) {
      this.userId = JSON.parse(userData).idUser;
    }
    this.getAnneesScolaires();
  }

  getAnneesScolaires(): void {
    this.http.get<{ data: any[], total: number }>(environment.apiUrl + '/years-school')
      .subscribe({
        next: (response) => {
          this.anneesScolaires = response.data;
          this.loadSemesters();
        },
        error: (error) => {
          console.error("Erreur", error);
          this.loadSemesters();
        }
      });
  }

  loadSemesters(): void {
    const apiUrl = environment.apiUrl + '/semestres';
    this.http.get<Semestre[]>(apiUrl).subscribe({
      next: (data) => {
        const filtered = data.filter((s: any) => s.idUser === this.userId);
        this.dataSource.data = filtered.map(s => {
          const annee = this.anneesScolaires.find(a => a.idSchool === s.idSchool);
          return {
            ...s,
            annee_scolaire: annee ? annee.annee_scolaire : undefined
          };
        });
      },
      error: (error) => {
        console.error('Erreur lors du chargement des semestres:', error);
        this.errorMessage = 'Impossible de charger les semestres.';
      },
    });
  }

  // deleteElement(idSem: number): void {
  //   this.dataSource.data = this.dataSource.data.filter((semester) => semester.idSem !== idSem);
  // }

  deleteElement(idSem: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce semestre ?')) {
      const apiUrl = `${environment.apiUrl}/semestres/${idSem}`;
      this.http.delete(apiUrl).subscribe({
        next: () => {
          // Supprimer l'élément du tableau local après la suppression réussie sur le serveur
          this.dataSource.data = this.dataSource.data.filter((semester) => semester.idSem !== idSem);
        },
        error: (error) => {
          console.error('Erreur lors de la suppression du semestre:', error);
          this.errorMessage = 'Impossible de supprimer le semestre.';
        },
      });
    }
  }

  openReinscriptionDialog(semestre: Semestre) {
    if (!this.userId) {
      alert("Erreur: utilisateur non identifié.");
      return;
    }

    // Récupérer les ID des années où un semestre avec exactement le même nom existe déjà
    const normalizedName = semestre.name.toLowerCase().trim();
    const existingYearsForName = this.dataSource.data
      .filter(s => s.name.toLowerCase().trim() === normalizedName)
      .map(s => s.idSchool);

    // Filtrer les années pour ne garder que celles où ce semestre n'existe pas encore
    const availableYears = this.anneesScolaires.filter(y => !existingYearsForName.includes(y.idSchool));

    if (availableYears.length === 0) {
      alert("Ce semestre existe déjà dans toutes les années scolaires disponibles.");
      return;
    }

    const dialogRef = this.dialog.open(SemestreDialogComponent, {
      width: '400px',
      data: {
        semestreName: semestre.name,
        idUser: this.userId,
        anneesScolaires: availableYears
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadSemesters();
      }
    });
  }

}

export interface Semestre {
  idSem: number;
  name: string;
  idSchool: number;
  idUser?: number;
  annee_scolaire?: string;
}
