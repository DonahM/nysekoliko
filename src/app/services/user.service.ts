import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  // Le service reste fourni globalement
})
export class UserService {
  private apiUrl = environment.apiUrl + '/user';  // URL de l'API

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, user);
  }

  uploadLogo(file: File): Observable<{ filePath: string }> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post<{ filePath: string }>(`${this.apiUrl}/upload`, formData);
  }

  toggleStatus(idUser: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${idUser}/toggle-status`, {});
  }
}
