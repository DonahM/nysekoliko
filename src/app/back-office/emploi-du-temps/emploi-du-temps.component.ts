import { environment } from '../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EmploiDuTempsDialogComponent } from '../emploi-du-temps-dialog/emploi-du-temps-dialog.component';

@Component({
  selector: 'app-emploi-du-temps',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule
  ],
  templateUrl: './emploi-du-temps.component.html',
  styleUrls: ['./emploi-du-temps.component.css']
})
export class EmploiDuTempsComponent implements OnInit {
  baseUrl = environment.baseUrl;
  yearsList: any[] = [];
  classesList: any[] = [];
  filteredClasses: any[] = [];
  
  selectedYear: number | null = null;
  selectedClass: number | null = null;

  scheduleItems: any[] = [];
  daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  hoursArray = ['07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'];

  isLoading = false;

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadYears();
    this.loadClasses();
  }

  loadYears(): void {
    this.http.get<any>(environment.apiUrl + '/years-school').subscribe({
      next: (res) => {
        this.yearsList = Array.isArray(res?.data) ? res.data : (Array.isArray(res) ? res : []);
      }
    });
  }

  loadClasses(): void {
    this.http.get<any[]>(environment.apiUrl + '/classes').subscribe({
      next: (res) => {
        this.classesList = res || [];
      }
    });
  }

  onYearChange(): void {
    this.selectedClass = null;
    this.scheduleItems = [];
    if (this.selectedYear) {
      this.filteredClasses = this.classesList.filter(c => c.idSchool === this.selectedYear);
    } else {
      this.filteredClasses = [];
    }
  }

  onClassChange(): void {
    if (this.selectedYear && this.selectedClass) {
      this.fetchSchedule();
    } else {
      this.scheduleItems = [];
    }
  }

  fetchSchedule(): void {
    this.isLoading = true;
    const url = `${environment.apiUrl}/emploi-du-temps/classe/${this.selectedClass}/year/${this.selectedYear}`;
    this.http.get<any[]>(url).subscribe({
      next: (res) => {
        this.scheduleItems = res || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur de chargement de emploi du temps:', err);
        this.isLoading = false;
      }
    });
  }

  getSlotsForDay(day: string): any[] {
    return this.scheduleItems.filter(item => item.jour.toLowerCase() === day.toLowerCase());
  }

  openAddDialog(): void {
    if (!this.selectedYear || !this.selectedClass) return;

    const dialogRef = this.dialog.open(EmploiDuTempsDialogComponent, {
      width: '500px',
      data: {
        idSchool: this.selectedYear,
        idCls: this.selectedClass
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchSchedule();
      }
    });
  }

  deleteSlot(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce cours ?')) {
      this.http.delete(`${environment.apiUrl}/emploi-du-temps/${id}`).subscribe({
        next: () => {
          this.fetchSchedule();
        },
        error: (err) => console.error('Erreur suppression:', err)
      });
    }
  }
}
