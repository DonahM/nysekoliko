import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { decodeId } from '../../../shared/utils/crypto.utils';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-semestre',
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
    HttpClientModule,
    RouterModule,
  ],
  templateUrl: './semestre.component.html',
  styleUrl: './semestre.component.css'
})
export class SemestreComponent implements OnInit {
  baseUrl = environment.baseUrl;

  years: any[] = [];
    filteredYears: any[] = [];
    semestres: any[] = [];
    student: any = null;
    selectedYear: string | null = null;
    errorMessage: string | null = null;
    dataSource = new MatTableDataSource<any>();
    
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  client: any;
  
    constructor(
      private http: HttpClient,
      private cdr: ChangeDetectorRef,
      private router: Router,
      private route: ActivatedRoute
    ) {}
  
    ngOnInit() {
      const userData = localStorage.getItem('userData');
      if (!userData) {
        alert('Utilisateur non connecté. Veuillez vous reconnecter.');
        this.router.navigate(['/front-office/form-client']);
        return;
      }
  
      this.fetchYears();
      this.fetchSemestres();
      this.fetchEdt();
    }
  
    fetchEdt(): void {
      const encodedId = this.route.snapshot.paramMap.get('idEdt'); // Utilisez 'route' pour accéder aux paramètres
      const idEdt = encodedId ? decodeId(encodedId) : null;
      console.log("edt ", idEdt)
      if (idEdt) {
        this.http.get(`${environment.apiUrl}/etudiants/id/${idEdt}`).subscribe({
          next: (data: any) => {
            if (Array.isArray(data) && data.length > 0) {
              this.client = data[0];  // Accédez au premier objet du tableau
              console.log('Nom du client:', this.client.name);  // Affiche le nom dans la console
            } else {
              console.warn('Aucune donnée trouvée');
            }
          }
        });
      }
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
          this.groupSemestresByYear();
        });
    }
  
    fetchSemestres() {
      this.http.get<any>(environment.apiUrl + '/semestres')
        .pipe(
          catchError(error => {
            console.error('Erreur API:', error);
            this.errorMessage = 'Impossible de charger les semestres.';
            return throwError(() => error);
          })
        )
        .subscribe(response => {
          this.semestres = response;
          this.groupSemestresByYear();
        });
    }
  
    groupSemestresByYear() {
      this.years.forEach((year: any) => {
        year.semestres = this.semestres.filter((semestre: any) => semestre.idSchool === year.idSchool);
      });
      this.cdr.detectChanges();
    }
  
    fetchSemestresByName(name: string): void {
      const apiUrl = `${environment.apiUrl}/etudiants/${name}`;
      
      this.http.get<any>(apiUrl).pipe(
        catchError(error => {
          console.error('Erreur lors de la récupération des semestres:', error);
          this.errorMessage = 'Impossible de charger les données des semestres.';
          return throwError(() => error);
        })
      ).subscribe({
        next: (data) => {
          if (!data) {
            this.errorMessage = 'Aucun étudiant trouvé avec ce nom.';
            this.dataSource.data = [];
            return;
          }
  
          this.student = data;
          this.dataSource.data = Array.isArray(data.semestres) 
            ? data.semestres.sort((a: { idSem: number; }, b: { idSem: number; }) => b.idSem - a.idSem) 
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
          this.errorMessage = 'Impossible de charger les données des semestres.';
        },
      });
    }
    
    
    onYearChange() {
      this.filteredYears = this.selectedYear
        ? this.years.filter((year: any) => year.annee_scolaire === this.selectedYear)
        : [...this.years];
    }

}
