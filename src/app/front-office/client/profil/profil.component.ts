import { environment } from '../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { decodeId, encodeId } from '../../../shared/utils/crypto.utils';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-profil',
  imports: [HttpClientModule, CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit  {
  baseUrl = environment.baseUrl;
  client: any;
  className: string = '';
  yearName: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const encodedId = this.route.parent?.snapshot.paramMap.get('idEdt');  // Récupère le paramètre 'idEdt' du composant parent
    const idEdt = encodedId ? decodeId(encodedId) : null;
    // console.log( "test64646: ", idEdt)
    if (idEdt) {
      this.http.get(`${environment.apiUrl}/etudiants/id/${idEdt}`).subscribe({
        next: (data: any) => {
          if (Array.isArray(data) && data.length > 0) {
            this.client = data[0];
            const idCls = this.client.classE && this.client.classE.length > 0 ? this.client.classE[0].idCls : null;
            const idSchool = this.client.years_schools && this.client.years_schools.length > 0 ? this.client.years_schools[0].idSchool : null;
            if (idCls) {
              this.http.get<any[]>(environment.apiUrl + '/classes').subscribe(classes => {
                const selected = classes.find(c => c.idCls === idCls);
                if (selected) this.className = selected.name;
              });
            }
            if (idSchool) {
              this.http.get<any>(environment.apiUrl + '/years-school/' + idSchool).subscribe(year => {
                if (year) this.yearName = year.annee_scolaire;
              });
            }
          } else {
            console.warn('Aucune donnée trouvée');
          }
        }
      });
    }
  }

  // Méthodes pour les actions
  getCurrentYear(): string {
    return new Date().getFullYear().toString();
  }

  editProfile(): void {
    console.log('Edit profile clicked');
    // TODO: Implémenter l'édition du profil
  }

  editPersonalInfo(): void {
    console.log('Edit personal info clicked');
    // TODO: Implémenter l'édition des informations personnelles
  }

  editFamilyInfo(): void {
    console.log('Edit family info clicked');
    // TODO: Implémenter l'édition des informations familiales
  }

  downloadProfile(): void {
    console.log('Download profile clicked');
    // TODO: Implémenter le téléchargement du profil
  }

  printProfile(): void {
    console.log('Print profile clicked');
    // TODO: Implémenter l'impression du profil
    window.print();
  }

  encode(id: any): string {
    return encodeId(id);
  }
}
