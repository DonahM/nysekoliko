import { environment } from '../../../environments/environment';
import { ChangeDetectionStrategy, Component, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { encodeId } from '../../shared/utils/crypto.utils';

@Component({
  selector: 'app-class',
  standalone: true,
  imports: [
    MatButtonModule, 
    MatCardModule, 
    CommonModule, 
    RouterModule, 
    HttpClientModule, 
    MatSelectModule, 
    MatOptionModule,
    MatIconModule,
    MatFormFieldModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent {
  baseUrl = environment.baseUrl;
  years: any[] = [];
  filteredYears: any[] = [];
  errorMessage: string | null = null;
  selectedYear: string | null = null;
  selectedNiveau: string | null = null;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    const userData = localStorage.getItem('userData');

    if (!userData) {
      alert('Utilisateur non connecté. Veuillez vous reconnecter.');
      this.router.navigate(['/front-office/form-client']);
      return;
    }

    const userId = JSON.parse(userData).idUser;

    // ✅ Récupération des années scolaires et classes
    this.http.get<any>(environment.apiUrl + '/years-school').subscribe({
      next: (response) => {
        console.log('Réponse API écoles:', response);

        const schools = response?.data || [];

        // ✅ Filtrer les classes par utilisateur
        const filteredSchools = schools.map((school: { classE: any[]; }) => ({
          ...school,
          classE: school.classE.filter(cls => cls.idUser === userId)
        }));

        // ✅ Regrouper les classes par année scolaire
        this.years = this.groupClassesByYear(filteredSchools);
        this.filteredYears = [...this.years];
        
        // ✅ Charger le nombre d'élèves pour chaque classe avec le bon endpoint
        this.loadStudentCounts();
        
        // ✅ Afficher les structures de données pour débogage
        console.log('Structure des classes:', this.years);
        
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des écoles:', error);
        this.errorMessage = 'Impossible de charger les années scolaires.';
      }
    });
  }

  loadStudentCounts() {
    this.cdr.detectChanges();
  }

  /**
   * ✅ Regroupe les classes par année scolaire et ajoute le nombre d'élèves
   */
  groupClassesByYear(schoolsData: any[]) {
    const grouped = schoolsData.map((school) => {
      const classes = school.classE || [];
      
      const classesWithStudentCount = classes.map((classItem: any) => {
        let studentCount = 0;
        
        if (classItem.etudiants && Array.isArray(classItem.etudiants)) {
          // Utilise les données réelles du backend
          studentCount = classItem.etudiants.length;
        }
        return {
          ...classItem,
          studentCount
        };
      });
      
      return {
        annee_scolaire: school.annee_scolaire || 'Année scolaire non définie',
        classes: classesWithStudentCount
      };
    });

    console.log('Données groupées avec nombres d\'élèves:', grouped);
    return grouped;
  }

  /**
   * ✅ Applique les filtres sur les années et les niveaux choisis
   */
  applyFilters() {
    this.filteredYears = this.years.map(year => {
      const filteredClasses = year.classes.filter((cls: any) => {
        if (this.selectedNiveau && cls.niveau !== this.selectedNiveau) {
          return false;
        }
        return true;
      });

      return {
        ...year,
        classes: filteredClasses
      };
    }).filter(year => {
      // Conserver l'année si elle correspond au filtre et s'il lui reste des classes (ou qu'on n'est pas sur un filtrage strict de niveau si on veut tout garder)
      if (this.selectedYear && year.annee_scolaire !== this.selectedYear) {
        return false;
      }
      return true;
    });
  }

  /**
   * ✅ Écouteur pour modifier l'année
   */
  onYearChange() {
    this.applyFilters();
  }

  /**
   * ✅ Écouteur pour modifier le niveau
   */
  onNiveauChange() {
    this.applyFilters();
  }

  /**
   * ✅ TrackBy functions pour optimisation des performances
   */
  trackByYear(index: number, year: any) {
    return year.annee_scolaire;
  }

  trackByClass(index: number, classItem: any) {
    return classItem.idCls;
  }

  /**
   * ✅ Calcule le nombre total d'élèves pour une année
   */
  getTotalStudents(year: any): number {
    if (!year.classes || !Array.isArray(year.classes)) {
      return 0;
    }
    
    return year.classes.reduce((total: number, classItem: any) => {
      // Le nombre d'élèves est maintenant directement dans classItem.studentCount
      return total + (classItem.studentCount || 0);
    }, 0);
  }

  encode(id: any): string {
    return encodeId(id);
  }
}
