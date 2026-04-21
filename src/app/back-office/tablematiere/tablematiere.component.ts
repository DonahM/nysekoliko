import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatiereDialogComponent } from './matiere-dialog/matiere-dialog.component';
import { EditMatiereDialogComponent } from './edit-matiere-dialog/edit-matiere-dialog.component';

@Component({
  selector: 'app-tablematiere',
  standalone: true,
  imports: [
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    MatTooltipModule,
    MatDialogModule
  ],
  templateUrl: './tablematiere.component.html',
  styleUrls: ['./tablematiere.component.css']
})
export class TablematiereComponent implements OnInit {
  baseUrl = environment.baseUrl;
  displayedColumns: string[] = ['name','idSchool', 'actions'];
  dataSource: MatTableDataSource<Matiere> = new MatTableDataSource<Matiere>([]);
  errorMessage: string | null = null;
  apiUrl: string = environment.apiUrl + '/matieres'; 
  userId: number | null = null;
  anneesScolaires: Array<{ idSchool: number; annee_scolaire: string }> = [];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    
    const userDataStr = localStorage.getItem('userData');
    if (userDataStr) {
      const userData = JSON.parse(userDataStr);
      this.userId = userData.idUser;
    }

    this.getAnneesScolaires();
  }

  getAnneesScolaires(): void {
    this.http.get<{ data: any[], total: number }>(environment.apiUrl + '/years-school')
      .subscribe({
        next: (response) => {
          this.anneesScolaires = response.data;
          this.loadMatieres();
        },
        error: (error) => {
          console.error("Erreur", error);
          this.loadMatieres();
        }
      });
  }

  loadMatieres(): void {
    this.http.get<Matiere[]>(this.apiUrl).subscribe({
      next: (data) => {
        const filtered = data.filter((m: any) => m.idUser === this.userId);
        this.dataSource.data = filtered.map(m => {
          const annee = this.anneesScolaires.find(a => a.idSchool === m.idSchool);
          return {
            ...m,
            annee_scolaire: annee ? annee.annee_scolaire : undefined
          };
        });
      },
      error: (error) => {
        console.error('Erreur lors du chargement des matières:', error);
        this.errorMessage = 'Impossible de charger les matières.';
      }
    });
  }

  addElement() {
    const newElement: Matiere = {
      idMat: this.dataSource.data.length + 1,
      name: 'Nouvelle Matière',
      idEdt: 0,
      idSchool: 0,
      etudiants: [],
      notes: []
    };

    this.dataSource.data = [...this.dataSource.data, newElement];
    this.updatePaginator();
  }

  deleteElement(idMat: number) {
    if (confirm('Voulez-vous vraiment supprimer cette matière ?')) {
      this.http.delete(environment.apiUrl + '/matieres/' + idMat).subscribe({
        next: () => {
          this.loadMatieres();
        },
        error: (err) => {
          alert('Erreur lors de la suppression de la matière.');
          console.error(err);
        }
      });
    }
  }

  openEditDialog(matiere: Matiere) {
    const dialogRef = this.dialog.open(EditMatiereDialogComponent, {
      width: '400px',
      data: {
        matiere: matiere,
        anneesScolaires: this.anneesScolaires
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadMatieres();
      }
    });
  }

  openReinscriptionDialog(matiere: Matiere) {
    if (!this.userId) {
      alert("Erreur: utilisateur non identifié.");
      return;
    }

    // Récupérer les ID des années où une matière avec exactement le même nom existe déjà
    const normalizedName = matiere.name.toLowerCase().trim();
    const existingYearsForName = this.dataSource.data
      .filter(m => m.name.toLowerCase().trim() === normalizedName)
      .map(m => m.idSchool);

    // Filtrer les années pour ne garder que celles où cette matière n'existe pas encore
    const availableYears = this.anneesScolaires.filter(y => !existingYearsForName.includes(y.idSchool));

    if (availableYears.length === 0) {
      alert("Cette matière existe déjà dans toutes les années scolaires disponibles.");
      return;
    }

    const dialogRef = this.dialog.open(MatiereDialogComponent, {
      width: '400px',
      data: {
        matiereName: matiere.name,
        idUser: this.userId,
        anneesScolaires: availableYears
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Reload table if successfully duplicated
        this.loadMatieres();
      }
    });
  }

  private updatePaginator() {
    if (this.paginator) {
      this.paginator.length = this.dataSource.data.length;
      this.paginator.pageIndex = 0;
      this.dataSource.paginator = this.paginator;
    }
  }
}

export interface Matiere {
  idMat: number;
  name: string;
  idEdt: number;
  idSchool: number;
  idUser?: number;
  etudiants: any[];
  notes: any[];
  annee_scolaire?: string;
}
