import { environment } from '../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { decodeId } from '../../shared/utils/crypto.utils';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TemplateRef } from '@angular/core';
import { NgIfContext } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-profile-pro',
  imports: [CommonModule, HttpClientModule, MatIconModule, FormsModule],
  templateUrl: './profile-pro.component.html',
  styleUrl: './profile-pro.component.css'
})
export class ProfileProComponent implements OnInit {
  baseUrl = environment.baseUrl;
  prof: Prof | null = null;
  errorMessage: string | null = null;
  editingTaux = false;
  newTaux: number = 0;
  
  availableYears: any[] = [];
  reEnrolling = false;
  selectedYearForReEnroll: number | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const encodedId = this.route.snapshot.paramMap.get('idProf');
    const idProf = encodedId ? decodeId(encodedId) : null;
    if (idProf) {
      this.fetchProfDetails(Number(idProf));
    }
    this.fetchYears();
  }

  fetchYears() {
    this.http.get<any>(`${environment.apiUrl}/years-school`).subscribe({
      next: (res) => {
        this.availableYears = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
      }
    });
  }

  fetchProfDetails(idProf: number) {
    this.http.get<Prof>(`${environment.apiUrl}/professeurs/${idProf}`).subscribe({
      next: (response) => {
        this.prof = response;
        this.newTaux = response.taux_horaire || 0;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des détails du professeur :', error);
        this.errorMessage = 'Impossible de charger les détails du professeur.';
      }
    });
  }

  reEnroll() {
    if (!this.prof || !this.selectedYearForReEnroll) return;
    this.http.post(`${environment.apiUrl}/professeurs/${this.prof.idProf}/re-enroll`, { idSchool: this.selectedYearForReEnroll }).subscribe({
      next: () => {
        alert('Professeur réinscrit avec succès dans cette année!');
        this.reEnrolling = false;
        this.fetchProfDetails(this.prof!.idProf);
      },
      error: (error) => {
        console.error(error);
        alert('Erreur lors de la réinscription ou professeur déjà inscrit dans cette année.');
      }
    });
  }

  get filteredYears() {
    if (!this.prof || !this.prof.years_schools) return this.availableYears;
    const enrolledIds = this.prof.years_schools.map(ys => ys.idSchool);
    return this.availableYears.filter(y => !enrolledIds.includes(y.idSchool));
  }

  getSalariesByYear() {
    if (!this.prof?.salaires || this.prof.salaires.length === 0) {
      return [];
    }
    
    // Group by annee_scolaire
    const grouped: any = {};
    this.prof.salaires.forEach((s: any) => {
      if (typeof s !== 'string') {
        const year = s.years_schools?.annee_scolaire || 'Année non spécifiée';
        if (!grouped[year]) {
          grouped[year] = [];
        }
        grouped[year].push(s);
      }
    });

    return Object.keys(grouped).map(year => ({
      year: year,
      salaries: grouped[year]
    }));
  }

  saveTaux() {
    if (!this.prof) return;
    this.http.patch(`${environment.apiUrl}/professeurs/${this.prof.idProf}`, { taux_horaire: this.newTaux }).subscribe({
      next: () => {
        this.prof!.taux_horaire = this.newTaux;
        this.editingTaux = false;
        alert('Taux horaire mis à jour avec succès');
      },
      error: () => {
        alert('Erreur lors de la mise à jour du taux horaire');
      }
    });
  }
}
export interface Prof {
  idProf: number;
  name: string;
  surname: string;
  matiere: string;
  taux_horaire?: number;
  salaires?: any[]; 
  years_schools?: any[];
}