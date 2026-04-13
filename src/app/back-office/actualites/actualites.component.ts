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

@Component({
  selector: 'app-actualites',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, MatButtonModule, MatIconModule, MatCardModule, MatInputModule, MatSelectModule],
  templateUrl: './actualites.component.html',
  styleUrls: ['./actualites.component.css']
})
export class ActualitesComponent implements OnInit {
  baseUrl = environment.baseUrl;
  texte: string = '';
  selectedFile: File | null = null;
  actualites: any[] = [];
  apiUrl = environment.apiUrl + '/actualites';
  
  
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadActualites();
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
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

    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    this.http.post(this.apiUrl, formData).subscribe({
      next: () => {
        this.texte = '';
        this.selectedFile = null;
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
      this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
        this.loadActualites();
      });
    }
  }
}
