import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatCardModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [UserService],
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit, AfterViewInit, OnDestroy {
  baseUrl = environment.baseUrl;
  dataSource: any[] = [];
  filteredUsers: any[] = [];
  searchText: string = '';
  private scrollInterval: any;
  isDarkTheme: boolean = false;

  @ViewChild('sliderWrapper') sliderWrapper!: ElementRef<HTMLDivElement>;

  constructor(private userService: UserService) {
    // Mode clair par défaut, puis vérifier la préférence sauvegardée
    // this.isDarkTheme = this.getStoredTheme() ?? false;
  }

  ngOnInit(): void {
    this.loadUsers();
    // this.applyTheme();
  }

  ngAfterViewInit(): void {
    this.startAutoScroll();
  }

  ngOnDestroy(): void {
    this.stopAutoScroll();
  }

  startAutoScroll(): void {
    this.stopAutoScroll();
    this.scrollInterval = setInterval(() => {
      const el = this.sliderWrapper?.nativeElement;
      if (!el || this.filteredUsers.length <= 1) return;
      const step = 2;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 0) return;
      el.scrollLeft += step;
      if (el.scrollLeft >= maxScroll) {
        el.scrollLeft = 0;
      }
    }, 30);
  }

  stopAutoScroll(): void {
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval);
    }
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data: any[]) => {
        this.dataSource = data;
        this.filteredUsers = data.slice().reverse();
      },
      (error: any) => {
        console.error('Erreur :', error);
      }
    );
  }

  filterUsers(): void {
    const search = this.searchText.toLowerCase();

    this.filteredUsers = this.dataSource.filter(user =>
      user.name.toLowerCase().includes(search) ||
      user.surname.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search)
    );
  }
}