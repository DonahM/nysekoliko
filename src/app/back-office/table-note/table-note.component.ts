import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Classe } from '../../models/classe.model';
import { ClasseService } from '../../services/classe.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { encodeId } from '../../shared/utils/crypto.utils';

@Component({
  selector: 'app-table-note',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule
  ],
  providers: [ClasseService],
  templateUrl: './table-note.component.html',
  styleUrls: ['./table-note.component.css'],
})
export class TableNoteComponent implements OnInit {
  classes: Classe[] = [];
  filteredClasses: Classe[] = [];
  groupedClasses: { yearName: string, classes: Classe[] }[] = [];
  years: any[] = [];
  selectedYearId: number | null = null;
  displayedColumns: string[] = ['idCls', 'name', 'titulaire', 'num', 'anneeScolaire', 'actions'];
  dataSource = new MatTableDataSource<Classe>(this.classes);
  currentUser: any; 

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    private classeService: ClasseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkUserConnection();
    this.loadYears();
    this.loadClasses();
  }

  checkUserConnection(): void {
    const userData = localStorage.getItem('userData');

    if (!userData) {
      alert('Utilisateur non connecté. Veuillez vous reconnecter.');
      this.router.navigate(['/front-office/form-client']);
      return;
    }

    this.currentUser = JSON.parse(userData);
    console.log('Utilisateur connecté :', this.currentUser);
  }

  loadClasses(): void {
    if (!this.currentUser) {
      return;
    }

    this.classeService.getClasses().subscribe(
      (data: Classe[]) => {
        this.classes = data.filter((classe) => classe.idUser === this.currentUser.idUser);
        this.applyYearFilter();

        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
      },
      (error) => {
        console.error('Erreur de récupération des classes :', error);
      }
    );
  }

  loadYears(): void {
    this.classeService.getYearsSchools().subscribe({
      next: (response) => {
        this.years = Array.isArray(response?.data) ? response.data : [];
        if (this.classes.length > 0) {
          this.applyYearFilter();
        }
      },
      error: (error) => {
        console.error('Erreur de récupération des années scolaires :', error);
      }
    });
  }

  onYearChange(): void {
    this.applyYearFilter();
  }

  private applyYearFilter(): void {
    this.filteredClasses = this.selectedYearId
      ? this.classes.filter((classe) => classe.idSchool === this.selectedYearId)
      : this.classes;

    this.groupedClasses = [];
    const grouped = new Map<number, Classe[]>();
    for (const classe of this.filteredClasses) {
      if (!grouped.has(classe.idSchool)) {
        grouped.set(classe.idSchool, []);
      }
      grouped.get(classe.idSchool)!.push(classe);
    }

    for (const [idSchool, classes] of grouped.entries()) {
      const yearObj = this.years.find(y => y.idSchool === idSchool);
      const yearName = yearObj ? yearObj.annee_scolaire : 'Année Inconnue';
      this.groupedClasses.push({ yearName, classes });
    }
    
    this.groupedClasses.sort((a, b) => b.yearName.localeCompare(a.yearName));

    this.dataSource.data = this.filteredClasses;
  }
  viewNotes(idCls: number): void {
    this.router.navigate([`/back-office/tablenote/tablenoteclasse/${encodeId(idCls)}`]);
  }
  
  encode(id: any): string {
    return encodeId(id);
  }
}
