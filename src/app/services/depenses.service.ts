import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Depense {
  idDep?: number;
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
export class DepensesService {
  private apiUrl = environment.apiUrl + '/depenses';

  constructor(private http: HttpClient) { }

  getDepenses(idSchool?: number): Observable<Depense[]> {
    const url = idSchool ? `${this.apiUrl}?idSchool=${idSchool}` : this.apiUrl;
    return this.http.get<Depense[]>(url);
  }

  getDepenseById(id: number): Observable<Depense> {
    return this.http.get<Depense>(`${this.apiUrl}/${id}`);
  }

  createDepense(depense: Depense): Observable<Depense> {
    return this.http.post<Depense>(this.apiUrl, depense);
  }

  updateDepense(id: number, depense: Partial<Depense>): Observable<Depense> {
    return this.http.patch<Depense>(`${this.apiUrl}/${id}`, depense);
  }

  deleteDepense(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
