import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PresenceProf {
  idPresence?: number;
  date: string;
  heureDebut: string;
  heureFin: string;
  status: string;
  remarque: string;
  idProf: number;
  idSchool: number;
  idUser: number;
}

@Injectable({
  providedIn: 'root'
})
export class PresenceProfService {
  private apiUrl = environment.apiUrl + '/presences';

  constructor(private http: HttpClient) {}

  getPresences(date: string, idSchool: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?date=${date}&idSchool=${idSchool}`);
  }

  savePresence(presence: PresenceProf): Observable<any> {
    return this.http.post<any>(this.apiUrl, presence);
  }

  deletePresence(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
