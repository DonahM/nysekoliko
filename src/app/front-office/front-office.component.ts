import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-front-office',
  imports: [RouterModule, CommonModule, HttpClientModule],
  templateUrl: './front-office.component.html',
  styleUrl: './front-office.component.css'
})
export class FrontOfficeComponent {
  baseUrl = environment.baseUrl;
  years: any[] = [];
  filteredYears: any[] = [];
  errorMessage: string | null = null;
  selectedYear: string | null = null;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    const userData = localStorage.getItem('userData');

    if (!userData) {
      // alert('Utilisateur non connecté. Veuillez vous reconnecter.');
      // this.router.navigate(['/login']);
      return;
    }

    const userId = JSON.parse(userData).idUser;

    // Récupération des années scolaires et classes
    this.http.get<any>(environment.apiUrl + '/years-school').subscribe({
      next: (response) => {
        console.log('Réponse API écoles:', response);

        const schools = response?.data || [];

        // Filtrer les classes par utilisateur
        const filteredSchools = schools.map((school: { classE: any[]; }) => ({
          ...school,
          classE: school.classE.filter(cls => cls.idUser === userId)
        }));

        // Regrouper les classes par année scolaire
        this.years = this.groupClassesByYear(filteredSchools);
        this.filteredYears = [...this.years];
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des écoles:', error);
        this.errorMessage = 'Impossible de charger les années scolaires.';
      }
    });
  }

  groupClassesByYear(schoolsData: any[]) {
    const grouped = schoolsData.map((school) => ({
      annee_scolaire: school.annee_scolaire || 'Année scolaire non définie',
      classes: school.classE || [],
    }));

    console.log('Données groupées:', grouped);
    return grouped;
  }

  onYearChange() {
    if (this.selectedYear) {
      this.filteredYears = this.years.filter(year => year.annee_scolaire === this.selectedYear);
    } else {
      this.filteredYears = [...this.years];
    }
  }
}
