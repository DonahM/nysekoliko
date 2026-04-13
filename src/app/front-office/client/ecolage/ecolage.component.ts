import { environment } from '../../../../environments/environment';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { catchError } from 'rxjs/operators';
import { decodeId } from '../../../shared/utils/crypto.utils';
import { throwError } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-ecolage',
  imports: [
    MatButtonModule, 
    MatCardModule, 
    CommonModule, 
    MatTableModule, 
    MatPaginatorModule, 
    MatSortModule, 
    MatDialogModule, 
    MatSelectModule, 
    MatOptionModule,
    MatFormFieldModule,
    MatIconModule,
    MatChipsModule,
    HttpClientModule
  ],
  providers: [HttpClient],
  templateUrl: './ecolage.component.html',
  styleUrls: ['./ecolage.component.css'],
})
export class EcolageComponent implements OnInit {
  baseUrl = environment.baseUrl;
  years: any[] = [];
  filteredYears: any[] = [];
  ecolages: any[] = [];
  student: any = null;
  selectedYear: string | null = null;
  errorMessage: string | null = null;
  dataSource = new MatTableDataSource<any>();
  studentId: number | null = null;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const encodedIdStr = this.route.parent?.snapshot.paramMap.get('idEdt');
    const idEdtStr = encodedIdStr ? decodeId(encodedIdStr) : null;
    this.studentId = idEdtStr ? parseInt(idEdtStr, 10) : null;
    
    this.fetchYears();
    this.fetchEcolages();
    this.fetchEdt();
  }

  fetchYears() {
    this.http.get<any>(environment.apiUrl + '/years-school')
      .pipe(
        catchError(error => {
          console.error('Erreur API:', error);
          this.errorMessage = 'Impossible de charger les années scolaires.';
          return throwError(() => error);
        })
      )
      .subscribe(response => {
        this.years = response?.data || [];
        this.filteredYears = [...this.years];
        this.groupEcolagesByYear();
      });
  }

  fetchEcolages() {
    this.http.get<any>(environment.apiUrl + '/ecolages')
      .pipe(
        catchError(error => {
          console.error('Erreur API:', error);
          this.errorMessage = 'Impossible de charger les écolages.';
          return throwError(() => error);
        })
      )
      .subscribe(response => {
        this.ecolages = response;
        this.groupEcolagesByYear();
      });
  }

  fetchEdt(): void {
    const encodedId = this.route.parent?.snapshot.paramMap.get('idEdt'); // Utilisez 'route.parent' pour accéder aux paramètres du parent
    const idEdt = encodedId ? decodeId(encodedId) : null;
    console.log("edt ", idEdt)
    if (idEdt) {
      this.http.get(`${environment.apiUrl}/etudiants/id/${idEdt}`).subscribe({
        next: (data: any) => {
          if (Array.isArray(data) && data.length > 0) {
            this.student = data[0];  // Stocke les informations de l'étudiant
            console.log('Nom de l\'étudiant:', this.student.name);
          } else {
            console.warn('Aucune donnée trouvée');
          }
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des données étudiant:', err);
        }
      });
    }
  }

  groupEcolagesByYear() {
    this.years.forEach((year: any) => {
      year.ecolages = this.ecolages.filter((ecolage: any) => 
        ecolage.idSchool === year.idSchool && 
        (this.studentId ? ecolage.idEdt === this.studentId : true)
      );
    });
    this.cdr.detectChanges();
  }

  onYearChange(): void {
    if (this.selectedYear) {
      this.filteredYears = this.years.filter((year: any) => year.annee_scolaire === this.selectedYear);
    } else {
      this.filteredYears = [...this.years];
    }
  }

  // Méthodes pour les statistiques
  getTotalEcolage(): number {
    if (!this.selectedYear) return 0;
    const year = this.filteredYears.find((y: any) => y.annee_scolaire === this.selectedYear);
    if (!year || !year.ecolages) return 0;
    return year.ecolages.reduce((total: number, ecolage: any) => total + (ecolage.valeur || 0), 0);
  }

  getTotalPaid(): number {
    if (!this.selectedYear) return 0;
    const year = this.filteredYears.find((y: any) => y.annee_scolaire === this.selectedYear);
    if (!year || !year.ecolages) return 0;
    return year.ecolages
      .filter((ecolage: any) => ecolage.statut === 'Payé')
      .reduce((total: number, ecolage: any) => total + (ecolage.valeur || 0), 0);
  }

  getRemaining(): number {
    return this.getTotalEcolage() - this.getTotalPaid();
  }

  fetchEcolagesByName(name: string): void {
    const apiUrl = `${environment.apiUrl}/etudiants/${name}`;
    
    this.http.get<any>(apiUrl).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des écolages:', error);
        this.errorMessage = 'Impossible de charger les données des écolages.';
        return throwError(() => error);
      })
    ).subscribe({
      next: (response) => {
        console.log('Réponse API écolages:', response);
        if (!response) {
          this.errorMessage = 'Aucun étudiant trouvé avec ce nom.';
          this.dataSource.data = [];
          return;
        }

        this.student = response;
        this.dataSource.data = Array.isArray(response.ecolages) 
          ? response.ecolages.sort((a: { idEco: number; }, b: { idEco: number; }) => b.idEco - a.idEco) 
          : [];

        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
        if (this.sort) {
          this.dataSource.sort = this.sort;
        }
      },
      error: (err) => {
        console.error('Erreur API:', err);
        this.errorMessage = 'Impossible de charger les données des écolages.';
      },
    });
  }
}
