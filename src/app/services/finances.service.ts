import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Bilan {
  revenus: number;
  salaires: number;
  depenses: number;
  charges: number;
  benefice: number;
  annee_scolaire?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FinancesService {
  private apiUrl = environment.apiUrl + '/finances';

  constructor(private http: HttpClient) { }

  getBilanMois(idSchool: number, mois: string): Observable<Bilan> {
    return this.http.get<Bilan>(`${this.apiUrl}/bilan/mois?idSchool=${idSchool}&mois=${mois}`);
  }

  getBilanAnnee(idSchool: number, annee_scolaire: string): Observable<Bilan> {
    return this.http.get<Bilan>(`${this.apiUrl}/bilan/annee?idSchool=${idSchool}&annee_scolaire=${annee_scolaire}`);
  }

  getBilanGlobal(idSchool: number): Observable<Bilan> {
    return this.http.get<Bilan>(`${this.apiUrl}/bilan/all?idSchool=${idSchool}`);
  }
}
