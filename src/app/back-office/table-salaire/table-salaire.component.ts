import { environment } from '../../../environments/environment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReceiptDialogComponent } from '../receipt-dialog/receipt-dialog.component';

@Component({
  selector: 'app-table-salaire',
  standalone: true,
  imports: [
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    RouterModule,
    CommonModule,
    HttpClientModule,
    MatTooltipModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './table-salaire.component.html',
  styleUrls: ['./table-salaire.component.css'],
})
export class TableSalaireComponent implements OnInit {
  baseUrl = environment.baseUrl;
  displayedColumns: string[] = ['profName', 'mois', 'valeur', 'annee_scolaire', 'date', 'statut', 'actions'];
  dataSource: MatTableDataSource<Salaire> = new MatTableDataSource<Salaire>([]);
  errorMessage: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  professeur: any[] = [];
  anneesScolaires: Array<{ idSchool: number; annee_scolaire: string }> = [];
  salaireData: any[] = [];
  filterNom: string = '';
  filterAnnee: string = '';
  userId: number | null = null;

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    
    const userDataStr = localStorage.getItem('userData');
    if (userDataStr) {
      const userData = JSON.parse(userDataStr);
      this.userId = userData.idUser;
    }

    // Custom filter predicate for multiple columns
    this.dataSource.filterPredicate = (data: Salaire, filter: string) => {
      const searchTerms = JSON.parse(filter);
      const matchNom = data.profName ? data.profName.toLowerCase().indexOf(searchTerms.nom.toLowerCase()) !== -1 : false;
      const matchAnnee = data.annee_scolaire ? data.annee_scolaire.toLowerCase().indexOf(searchTerms.annee.toLowerCase()) !== -1 : false;
      return (searchTerms.nom === '' || matchNom) && (searchTerms.annee === '' || matchAnnee);
    };

    this.getProfesseur();
    this.getAnneesScolaires();
  }

  applyFilter() {
    this.dataSource.filter = JSON.stringify({
      nom: this.filterNom,
      annee: this.filterAnnee
    });
  }
  getProfesseur(): void {
    this.http.get<any[]>(environment.apiUrl + '/professeurs').subscribe({
      next: (professeurs) => {
        this.professeur = professeurs.filter(p => p.idUser === this.userId);
        this.getSalaire(); 
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des professeurs :', error);
      }
    });
  }

  /** 🔹 Récupère les années scolaires */
  getAnneesScolaires(): void {
    this.http.get<{ data: any[], total: number }>(environment.apiUrl + '/years-school')
      .subscribe({
        next: (response) => {
          console.log('Années scolaires récupérées :', response);
          this.anneesScolaires = response.data;
        },
        error: (error) => {
          console.error("Erreur lors de la récupération des années scolaires :", error);
        }
      });
  }

  getSalaire(): void {
    this.http.get<any[]>(environment.apiUrl + '/salaires').subscribe({
      next: (salaires) => {
        // Ne garder que les salaires dont le professeur appartient à l'utilisateur
        const filteredSalaires = salaires.filter(salaire => 
          this.professeur.some(p => p.idProf === salaire.idProf)
        );

        this.salaireData = filteredSalaires.map((salaire) => {
          const prof = this.professeur.find(p => p.idProf === salaire.idProf);
          const profName = prof ? `${prof.name} ${prof.surname}` : 'Inconnu';
          
          const annee = this.anneesScolaires.find(a => a.idSchool === salaire.idSchool);
          const anneeScolaire = annee ? annee.annee_scolaire : 'Inconnue';
          
          return {
            ...salaire,
            profName,
            annee_scolaire: anneeScolaire
          };
        });

        this.dataSource.data = this.salaireData; 
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des salaires :', error);
      }
    });
  }

  deleteElement(idSal: number): void {
    this.dataSource.data = this.dataSource.data.filter((salaire) => salaire.idSal !== idSal);
  }

  /** 🔹 Get status class for styling */
  getStatusClass(statut: string): string {
    switch (statut?.toLowerCase()) {
      case 'payé':
      case 'paye':
        return 'status-paid';
      case 'en attente':
      case 'en attente de paiement':
        return 'status-pending';
      case 'non payé':
      case 'non paye':
        return 'status-unpaid';
      default:
        return 'status-default';
    }
  }

  /** 🔹 Get status icon */
  getStatusIcon(statut: string): string {
    switch (statut?.toLowerCase()) {
      case 'payé':
      case 'paye':
        return '✅';
      case 'en attente':
      case 'en attente de paiement':
        return '⏳';
      case 'non payé':
      case 'non paye':
        return '❌';
      default:
        return '📋';
    }
  }

  openReceiptDialog(salaire: Salaire): void {
    const dialogRef = this.dialog.open(ReceiptDialogComponent, {
      width: 'auto',
      maxWidth: '95vw',
      data: {
        type: 'salaire',
        item: salaire,
        yearName: salaire.annee_scolaire || ''
      }
    });
  }
}

export interface Salaire {
  idSal: number;
  mois: string;
  statut: string;
  valeur: number;
  date: string;
  idProf: number;
  idSchool: number;
  profName?: string;
  annee_scolaire?: string;
}
