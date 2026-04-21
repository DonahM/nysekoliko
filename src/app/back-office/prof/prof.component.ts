import { environment } from '../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { encodeId } from '../../shared/utils/crypto.utils';

export interface ProfYearGroup {
  yearLabel: string;
  idSchool: number;
  profs: Prof[];
}

@Component({
  selector: 'app-prof',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    RouterModule,
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './prof.component.html',
  styleUrl: './prof.component.css',
})
export class ProfComponent implements OnInit {
  baseUrl = environment.baseUrl;
  displayedColumns: string[] = ['nom', 'matiere', 'actions'];
  profsByYear: ProfYearGroup[] = [];
  /** `null` = afficher toutes les années */
  selectedYearId: number | null = null;
  errorMessage: string | null = null;

  /** Groupes affichés selon le filtre année */
  get filteredProfsByYear(): ProfYearGroup[] {
    if (this.selectedYearId === null) {
      return this.profsByYear;
    }
    return this.profsByYear.filter((g) => g.idSchool === this.selectedYearId);
  }

  constructor(private http: HttpClient, private router: Router) {}

  userId: number | null = null;
  
  ngOnInit() {
    const userDataStr = localStorage.getItem('userData');
    if (userDataStr) {
      const userData = JSON.parse(userDataStr);
      this.userId = userData.idUser;
    }
    this.fetchProfesseurs();
  }

  fetchProfesseurs() {
    forkJoin({
      profs: this.http.get<any[]>(environment.apiUrl + '/professeurs'),
      yearsRes: this.http.get<any>(environment.apiUrl + '/years-school'),
    }).subscribe({
      next: ({ profs, yearsRes }) => {
        const years = Array.isArray(yearsRes?.data)
          ? yearsRes.data
          : Array.isArray(yearsRes)
            ? yearsRes
            : [];
        const mapped = this.mapData(profs || []).filter(p => p.idUser === this.userId);
        this.profsByYear = years.map((y: any) => ({
          yearLabel: y.annee_scolaire ?? `Année #${y.idSchool}`,
          idSchool: y.idSchool,
          profs: mapped.filter((p) => p.years_schools?.some((ys: any) => ys.idSchool === y.idSchool)),
        }));
        
        // Find professors with no associated years (orphans)
        const orphans = mapped.filter((p) => !p.years_schools || p.years_schools.length === 0);
        if (orphans.length > 0) {
          this.profsByYear.push({
            yearLabel: 'Autre (Année non spécifiée)',
            idSchool: -1,
            profs: orphans,
          });
        }
      },
      error: () => {
        this.errorMessage = 'Impossible de charger les professeurs.';
      },
    });
  }

  mapData(data: any[]): Prof[] {
    return data.map((prof) => ({
      matricule: prof.idProf,
      nom: prof.name,
      prenom: prof.surname,
      matiere: prof.matiere,
      idUser: prof.idUser,
      years_schools: prof.years_schools || []
    }));
  }

  viewDetails(matricule: number) {
    this.router.navigate(['/back-office/prof/profile', encodeId(matricule)]);
  }

  deleteProffesseur(matricule: number) {
    if (confirm('Voulez-vous vraiment supprimer ce professeur de la base de données ?')) {
      this.http.delete(environment.apiUrl + '/professeurs/' + matricule).subscribe({
        next: () => {
          this.loadProfs();
        },
        error: (err) => {
          console.error(err);
          alert('Impossible de supprimer ce professeur. Il est peut-être associé à des salaires ou des cours existants.');
        }
      });
    }
  }

  /** ✅ Obtient le nombre total de professeurs (uniques) */
  getTotalProfesseurs(): number {
    const ids = new Set<number>();
    this.profsByYear.forEach(group => group.profs.forEach(p => ids.add(p.matricule)));
    return ids.size;
  }

  /** ✅ Obtient le nombre de matières uniques pour un groupe */
  getUniqueSubjects(group: ProfYearGroup): number {
    const subjects = new Set(group.profs.map(prof => prof.matiere).filter(matiere => matiere));
    return subjects.size;
  }

  /** ✅ TrackBy function pour optimisation */
  trackByYear(index: number, group: ProfYearGroup) {
    return group.idSchool;
  }

  /** ✅ Recharge les professeurs */
  loadProfs() {
    this.errorMessage = null;
    this.fetchProfesseurs();
  }
}

export interface Prof {
  matricule: number;
  nom: string;
  prenom: string;
  matiere: string;
  idUser?: number;
  years_schools?: any[];
}
