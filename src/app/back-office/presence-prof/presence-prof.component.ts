import { environment } from '../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PresenceProfDialogComponent } from './presence-prof-dialog.component';

@Component({
  selector: 'app-presence-prof',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatTableModule, MatFormFieldModule, MatSelectModule,
    MatInputModule, MatIconModule, MatButtonModule, MatCardModule, MatNativeDateModule,
    MatChipsModule, MatDialogModule, HttpClientModule
  ],
  templateUrl: './presence-prof.component.html',
  styleUrls: ['./presence-prof.component.css']
})
export class PresenceProfComponent implements OnInit {
  baseUrl = environment.baseUrl;
  yearsSchools: any[] = [];
  selectedYear: number | null = null;
  selectedDate: string = this.getFormattedDate(new Date());
  professeurs: any[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  
  displayedColumns: string[] = ['matricule', 'name', 'matiere', 'actions'];

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadYears();
  }

  loadYears() {
    this.http.get<any>(environment.apiUrl + '/years-school').subscribe(res => {
      this.yearsSchools = res.data || [];
      if (this.yearsSchools.length > 0) {
        this.selectedYear = this.yearsSchools[0].idSchool;
        this.loadData();
      }
    });
  }

  onFiltersChange() {
    this.loadData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getFormattedDate(d: Date): string {
    const month = '' + (d.getMonth() + 1);
    const day = '' + d.getDate();
    const year = d.getFullYear();
    return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
  }

  loadData() {
    if (!this.selectedYear || !this.selectedDate) return;
    this.http.get<any[]>(environment.apiUrl + '/professeurs').subscribe(profs => {
      const userDataStr = localStorage.getItem('userData');
      const userId = userDataStr ? JSON.parse(userDataStr).idUser : null;
      this.professeurs = profs.filter(p => p.idUser === userId && p.idSchool === this.selectedYear);
      
      // Mise en place d'un filtre personnalisé pour inclure ID Prof, Nom et Prénom
      this.dataSource = new MatTableDataSource(this.professeurs);
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const dataStr = `${data.idProf} ${data.name} ${data.surname} ${data.matiere}`.toLowerCase();
        return dataStr.indexOf(filter) != -1;
      };
    });
  }

  openDialog(prof: any) {
    const userDataStr = localStorage.getItem('userData');
    const userId = userDataStr ? JSON.parse(userDataStr).idUser : null;

    this.dialog.open(PresenceProfDialogComponent, {
      width: '800px',
      data: {
        profId: prof.idProf,
        profName: prof.name + ' ' + prof.surname,
        date: this.selectedDate,
        idSchool: this.selectedYear,
        idUser: userId
      }
    });
  }
}
