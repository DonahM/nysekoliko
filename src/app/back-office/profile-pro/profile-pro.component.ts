import { environment } from '../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { decodeId } from '../../shared/utils/crypto.utils';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TemplateRef } from '@angular/core';
import { NgIfContext } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-profile-pro',
  imports: [CommonModule, HttpClientModule, MatIconModule],
  templateUrl: './profile-pro.component.html',
  styleUrl: './profile-pro.component.css'
})
export class ProfileProComponent implements OnInit {
  baseUrl = environment.baseUrl;
  prof: Prof | null = null;
  errorMessage: string | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const encodedId = this.route.snapshot.paramMap.get('idProf');
    const idProf = encodedId ? decodeId(encodedId) : null;
    if (idProf) {
      this.fetchProfDetails(Number(idProf));
    }
  }

  fetchProfDetails(idProf: number) {
    this.http.get<Prof>(`${environment.apiUrl}/professeurs/${idProf}`).subscribe({
      next: (response) => {
        this.prof = response;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des détails du professeur :', error);
        this.errorMessage = 'Impossible de charger les détails du professeur.';
      }
    });
  }

  getSalariesByYear() {
    if (!this.prof?.salaires || this.prof.salaires.length === 0) {
      return [];
    }
    
    // Group by annee_scolaire
    const grouped: any = {};
    this.prof.salaires.forEach((s: any) => {
      if (typeof s !== 'string') {
        const year = s.years_schools?.annee_scolaire || s.annee_scolaire || 'Année non spécifiée';
        if (!grouped[year]) {
          grouped[year] = [];
        }
        grouped[year].push(s);
      }
    });

    // Convert to array
    return Object.keys(grouped).map(year => ({
      year: year,
      salaries: grouped[year]
    }));
  }
  
}
export interface Prof {
  idProf: number;
  name: string;
  surname: string;
  matiere: string;
  salaires?: string[]; 
}