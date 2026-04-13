import { environment } from '../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-actualites-page',
  standalone: true,
  imports: [
    CommonModule, 
    HttpClientModule, 
    MatCardModule, 
    MatIconModule, 
    MatButtonModule, 
    RouterModule,
    MatMenuModule
  ],
  templateUrl: './actualites-page.component.html',
  styleUrls: ['./actualites-page.component.css']
})
export class ActualitesPageComponent implements OnInit {
  baseUrl = environment.baseUrl;
  actualites: any[] = [];
  apiUrl = environment.apiUrl + '/actualites';
  isDarkTheme: boolean = false;

  constructor(private http: HttpClient) {
    // this.isDarkTheme = this.getStoredTheme() ?? false;
  }

  ngOnInit(): void {
    this.loadActualites();
    // this.applyTheme();
  }

  loadActualites() {
    this.http.get<any[]>(this.apiUrl).subscribe(data => {
      this.actualites = data;
    });
  }
}
