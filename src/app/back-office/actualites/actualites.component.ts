import { environment } from '../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-actualites',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, MatButtonModule, MatIconModule, MatCardModule, MatInputModule, MatSelectModule, MatTooltipModule],
  templateUrl: './actualites.component.html',
  styleUrls: ['./actualites.component.css']
})
export class ActualitesComponent implements OnInit {
  baseUrl = environment.baseUrl;
  texte: string = '';
  selectedFiles: File[] = [];
  actualites: any[] = [];
  apiUrl = environment.apiUrl + '/actualites';
  userId: number | null = null;
  userRole: string[] = [];
  
  editingId: number | null = null;
  editText: string = '';

  
  
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const userDataStr = localStorage.getItem('userData');
    if (userDataStr) {
      const userData = JSON.parse(userDataStr);
      this.userId = userData.idUser;
      if (Array.isArray(userData.roles)) {
        this.userRole = userData.roles;
      } else if (typeof userData.roles === 'string') {
        this.userRole = [userData.roles];
      }
    }
  
    this.loadActualites();
  }

  hasRole(allowedRoles: string[]): boolean {
    return this.userRole.some(r => allowedRoles.includes(r));
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFiles = Array.from(event.target.files);
    }
  }

  submitActualite() {
    if (!this.texte || this.texte.trim() === '') return;

    const formData = new FormData();
    formData.append('texte', this.texte);
    
    // Extrait l'idUser s'il existe depuis le localStorage
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      if (parsedData.idUser) {
        formData.append('idUser', parsedData.idUser);
      }
    }

    if (this.selectedFiles.length > 0) {
      this.selectedFiles.forEach(file => {
        formData.append('files', file);
      });
    }

    this.http.post(this.apiUrl, formData).subscribe({
      next: () => {
        this.texte = '';
        this.selectedFiles = [];
        this.loadActualites(); // Refresh
      },
      error: (err) => {
        console.error('Erreur lors de la publication:', err);
      }
    });
  }

  loadActualites() {
    this.http.get<any[]>(this.apiUrl).subscribe(data => {
      this.actualites = data;
    });
  }

  deleteActualite(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cette actualité ?')) {
      const headers = { 'x-user-id': this.userId ? this.userId.toString() : '' };
      this.http.delete(`${this.apiUrl}/${id}`, { headers }).subscribe({
        next: () => this.loadActualites(),
        error: (err) => {
          if (err.status === 403) alert('Vous n\'avez pas la permission de supprimer (Super Admin uniquement).');
        }
      });
    }
  }

  toggleStatus(id: number) {
    this.http.patch(`${this.apiUrl}/${id}/toggle-status`, {}).subscribe(() => {
      this.loadActualites();
    });
  }

  startEdit(act: any) {
    this.editingId = act.idActualite;
    // Strip HTML tags for editing
    this.editText = act.texte.replace(/<[^>]*>?/gm, '');
  }

  cancelEdit() {
    this.editingId = null;
    this.editText = '';
  }

  saveEdit(id: number) {
    if (!this.editText || this.editText.trim() === '') return;
    this.http.patch(`${this.apiUrl}/${id}`, { texte: this.editText }).subscribe(() => {
      this.editingId = null;
      this.loadActualites();
    });
  }

  getMediaUrls(urlStr: string): string[] {
    if (!urlStr) return [];
    return urlStr.split(',');
  }

  isImage(url: string): boolean {
    return url.match(/\.(jpg|jpeg|png|gif|webp)$/i) !== null;
  }

  isVideo(url: string): boolean {
    return url.match(/\.(mp4|avi|mov|mkv|webm)$/i) !== null;
  }
}
