import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Etudiant } from '../models/etudiant.model';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  private apiUrl = environment.apiUrl + '/etudiants';

  constructor(private http: HttpClient) {}

  getEtudiantsByClasse(classeId: number): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(`${this.apiUrl}/classe/${classeId}`);
  }

  getMatiereAndNotes(etudiantId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/notes/${etudiantId}`);
  }
}
