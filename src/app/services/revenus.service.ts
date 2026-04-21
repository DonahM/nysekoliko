import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Revenu {
  idRev?: number;
  titre: string;
  description?: string;
  categorie?: string;
  valeur: number;
  date: string;
  mois?: string;
  idSchool: number;
  idUser?: number;
}

@Injectable({
  providedIn: 'root'
})
export class RevenusService {
  private apiUrl = environment.apiUrl + '/revenus';

  constructor(private http: HttpClient) { }

  getRevenus(idSchool?: number): Observable<Revenu[]> {
    const url = idSchool ? `${this.apiUrl}?idSchool=${idSchool}` : this.apiUrl;
    return this.http.get<Revenu[]>(url);
  }

  getRevenuById(id: number): Observable<Revenu> {
    return this.http.get<Revenu>(`${this.apiUrl}/${id}`);
  }

  createRevenu(revenu: Revenu): Observable<Revenu> {
    return this.http.post<Revenu>(this.apiUrl, revenu);
  }

  updateRevenu(id: number, revenu: Partial<Revenu>): Observable<Revenu> {
    return this.http.patch<Revenu>(`${this.apiUrl}/${id}`, revenu);
  }

  deleteRevenu(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
