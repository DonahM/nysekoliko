import { environment } from '../../environments/environment';
// src/app/services/classe.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Classe } from '../models/classe.model';
import { Etudiant } from '../models/etudiant.model';
import { Matiere } from '../models/matiere.model';

@Injectable({
  providedIn: 'root'
})
export class ClasseService {
    getStudentsInClass(idCls: string): Observable<Classe[]> {
        return this.http.get<Classe[]>(`${this.apiUrl}/${idCls}`);
      }
      
  private apiUrl = environment.apiUrl + '/classes';
  constructor(private http: HttpClient) {}

  getClasses(): Observable<Classe[]> {
    return this.http.get<Classe[]>(this.apiUrl);
  }

  getMatieres(): Observable<Matiere[]> {
    return this.http.get<Matiere[]>(environment.apiUrl + '/matieres');
  }  

  getYearsSchools(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/years-school');
  }

  getSemestres(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl + '/semestres');
  }

  getClasseById(id: number): Observable<Classe> {
    return this.http.get<Classe>(`${this.apiUrl}/${id}`);
  }

  getStudentsByClass(idCls: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/class-e-students/class/${idCls}`);
  }

  createClasse(classe: Classe): Observable<Classe> {
    return this.http.post<Classe>(this.apiUrl, classe);
  }

  updateClasse(id: number, classe: Classe): Observable<Classe> {
    return this.http.put<Classe>(`${this.apiUrl}/${id}`, classe);
  }

  deleteClasse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
