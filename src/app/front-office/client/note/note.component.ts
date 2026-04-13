import { environment } from '../../../../environments/environment';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { decodeId, encodeId } from '../../../shared/utils/crypto.utils';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-note',
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
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    HttpClientModule,
    RouterModule,
  ],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent implements OnInit {
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

  averageGradeStr: string = '0';
  totalSubjectsStr: string = '0';
  bestGradeStr: string = '0';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.fetchEdtAndNotes();
  }

  fetchEdtAndNotes(): void {
    const encodedId = this.route.parent?.snapshot.paramMap.get('idEdt'); // Utilisez 'route.parent' pour accéder aux paramètres du parent
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
      // Fetch notes
      this.fetchStudentNotes(idEdt);
    }
  }

  fetchStudentNotes(idEdt: string) {
    this.http.get<any[]>(`${environment.apiUrl}/notes/notes/${idEdt}`).subscribe({
      next: (notes) => {
        this.processNotes(notes);
      },
      error: (err) => {
        console.error('Erreur API notes:', err);
        this.errorMessage = 'Impossible de charger les notes.';
      }
    });
  }

  processNotes(notes: any[]) {
    const yearsMap = new Map<number, any>();
    
    notes.forEach(note => {
      // note contains matieres, semestre, years_schools
      if (note.years_schools && note.semestre) {
        let yearObj = yearsMap.get(note.years_schools.idSchool);
        if (!yearObj) {
          yearObj = {
            idSchool: note.years_schools.idSchool,
            annee_scolaire: note.years_schools.annee_scolaire,
            semestresMap: new Map<number, any>()
          };
          yearsMap.set(note.years_schools.idSchool, yearObj);
        }
        
        let semObj = yearObj.semestresMap.get(note.semestre.idSem);
        if (!semObj) {
          semObj = {
            idSem: note.semestre.idSem,
            name: note.semestre.name,
            notes: []
          };
          yearObj.semestresMap.set(note.semestre.idSem, semObj);
        }
        
        semObj.notes.push(note);
      }
    });

    this.years = Array.from(yearsMap.values()).map(y => {
      return {
        idSchool: y.idSchool,
        annee_scolaire: y.annee_scolaire,
        semestres: Array.from(y.semestresMap.values())
      };
    });
    
    this.filteredYears = [...this.years];
    this.calculateGlobalStats(notes);
    this.cdr.detectChanges();
  }

  calculateGlobalStats(notes: any[]) {
    if (notes.length === 0) {
      this.averageGradeStr = '0';
      this.totalSubjectsStr = '0';
      this.bestGradeStr = '0';
      return;
    }
    this.totalSubjectsStr = notes.length.toString();
    
    let sum = 0;
    let totalCoef = 0;
    let maxGrade = 0;
    
    notes.forEach(note => {
      // note.note usually is out of 20, multiply by coefficient
      const noteVal = note.note || 0;
      const coef = note.coefficient || 1;
      sum += noteVal * coef;
      totalCoef += coef;
      if (noteVal > maxGrade) {
        maxGrade = noteVal;
      }
    });
    
    const avg = totalCoef > 0 ? sum / totalCoef : 0;
    this.averageGradeStr = avg.toFixed(2);
    this.bestGradeStr = maxGrade.toString();
  }



  onSemestreClick(semestre: any) {
    console.log("Semestre sélectionné :", semestre);
    // Ici, tu peux rediriger l'utilisateur ou afficher des détails sur le semestre
    this.router.navigate(['/semestre', encodeId(semestre.idSem)]);
  }

  
  
  onYearChange() {
    this.filteredYears = this.selectedYear
      ? this.years.filter(year => year.annee_scolaire === this.selectedYear)
      : [...this.years];
  }

  getAverageGrade(): string {
    return this.averageGradeStr;
  }

  getTotalSubjects(): string {
    return this.totalSubjectsStr;
  }

  getBestGrade(): string {
    return this.bestGradeStr;
  }

  refreshData(): void {
    console.log('Rafraîchir les données');
    this.ngOnInit();
  }

  downloadNotes(): void {
    console.log('Télécharger les notes');
    // TODO: Implémenter le téléchargement
  }

  isCurrentYear(year: string): boolean {
    const currentYear = new Date().getFullYear();
    const schoolYear = year.split('-')[0];
    return parseInt(schoolYear) === currentYear;
  }

  getSemestreCount(year: any): number {
    return year.semestres ? year.semestres.length : 0;
  }

  getSubjectCount(semestre: any): number {
    return semestre.notes?.length || 0;
  }

  getSemestreAverage(semestre: any): string {
    if (!semestre.notes || semestre.notes.length === 0) return '0';
    let sum = 0;
    let totalCoef = 0;
    semestre.notes.forEach((note: any) => {
      const val = note.note || 0;
      const coef = note.coefficient || 1;
      sum += val * coef;
      totalCoef += coef;
    });
    return totalCoef > 0 ? (sum / totalCoef).toFixed(2) : '0';
  }

  getGradeColor(semestre: any): string {
    const average = parseFloat(this.getSemestreAverage(semestre));
    if (average >= 16) return 'primary';
    if (average >= 14) return 'accent';
    if (average >= 12) return 'warn';
    return '';
  }

  getSemestreGrade(semestre: any): string {
    const average = parseFloat(this.getSemestreAverage(semestre));
    if (average >= 16) return 'A';
    if (average >= 14) return 'B';
    if (average >= 12) return 'C';
    if (average >= 10) return 'D';
    return 'E';
  }

  retryLoad(): void {
    console.log('Réessayer le chargement');
    this.errorMessage = '';
    this.ngOnInit();
  }

  encode(id: any): string {
    return encodeId(id);
  }
}
