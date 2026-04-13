import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-back-office',
  standalone: true,
  imports: [RouterModule, CommonModule, HttpClientModule, MatIconModule],
  templateUrl: './back-office.component.html',
  styleUrl: './back-office.component.css'
})
export class BackOfficeComponent implements OnInit {
  baseUrl = environment.baseUrl;

  isMenuOpen = false;
  userRole: string | null = null;
  userName: string = '';
  userLogo: string | null = null;
  notifications: any = null;
  isNotifOpen = false;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      this.userRole = parsedData.roles;
      this.userName = `${parsedData.name || ''} ${parsedData.surname || ''}`.trim();
      this.userLogo = parsedData.photo || parsedData.logo || null;
    }
    this.fetchNotifications();
  }

  fetchNotifications() {
    this.http.get(environment.apiUrl + '/ecolages/notifications/unpaid').subscribe({
      next: (res: any) => {
        this.notifications = res;
      },
      error: (err) => console.error('Erreur notifications:', err)
    });
  }

  toggleNotif() {
    this.isNotifOpen = !this.isNotifOpen;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  logout() {
    localStorage.removeItem('userData');
    this.closeMenu();
    this.router.navigate(['/front-office/accueil']);
  }

  scrollToSection(sectionId: string) {
    this.isMenuOpen = false;
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  }

  hasRole(roles: string[]): boolean {
    return this.userRole ? roles.includes(this.userRole) : false;
  }
}
