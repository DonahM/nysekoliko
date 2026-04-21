import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ChatService } from '../services/chat.service';
import { ProfileDialogComponent } from './parametres/profile-dialog/profile-dialog.component';

@Component({
  selector: 'app-back-office',
  standalone: true,
  imports: [RouterModule, CommonModule, HttpClientModule, MatIconModule, MatMenuModule, MatDialogModule],
  templateUrl: './back-office.component.html',
  styleUrl: './back-office.component.css'
})
export class BackOfficeComponent implements OnInit, OnDestroy {
  baseUrl = environment.baseUrl;

  isMenuOpen = false;
  userRole: string | null = null;
  userName: string = '';
  userLogo: string | null = null;
  userId: number | null = null;
  unreadMessageCount: number = 0;
  notifications: any = null;
  isNotifOpen = false;
  private messageInterval: any;

  constructor(private router: Router, private http: HttpClient, private chatService: ChatService, private dialog: MatDialog) {}

  ngOnInit() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      this.userRole = parsedData.roles;
      this.userName = `${parsedData.name || ''}`.trim();
      const rawLogo = parsedData.photo || parsedData.logo || null;
      this.userLogo = (rawLogo && rawLogo !== 'string') ? rawLogo : null;
      this.userId = parsedData.idUser || parsedData.id || null;
    }
    this.fetchNotifications();
    this.fetchUnreadMessages();
    this.messageInterval = setInterval(() => {
      this.fetchUnreadMessages();
    }, 10000);
  }

  ngOnDestroy() {
    if (this.messageInterval) {
      clearInterval(this.messageInterval);
    }
  }

  fetchUnreadMessages() {
    if (this.userId && this.hasRole(['ADMIN', 'SUPPER ADMIN', 'ENSEIGNANT', 'USER'])) {
      this.chatService.getUnreadCount(this.userId).subscribe({
        next: (res) => {
          this.unreadMessageCount = res.count || 0;
        },
        error: (err) => console.error('Erreur compte messages:', err)
      });
    }
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

  openProfileDialog() {
    const userDataStr = localStorage.getItem('userData');
    let userData = null;
    if (userDataStr) userData = JSON.parse(userDataStr);

    this.dialog.open(ProfileDialogComponent, {
      width: '450px',
      data: userData
    });
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
