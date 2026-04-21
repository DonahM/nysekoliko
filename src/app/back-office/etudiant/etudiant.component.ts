import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AnneescolaireComponent } from '../anneescolaire/anneescolaire.component';
import { StudentIdDialogComponent } from '../student-id-dialog/student-id-dialog.component';
import { StudentIdEDialogComponent } from '../student-id-e-dialog/student-id-e-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { encodeId } from '../../shared/utils/crypto.utils';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-etudiant',
  standalone: true,
  imports: [
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    RouterModule,
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule,
    MatSlideToggleModule
  ],
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css'],
})
export class EtudiantComponent implements OnInit {
  displayedColumns: string[] = ['photo', 'matricule','numero', 'nom', 'prenom', 'classe', 'anneeScolaire', 'acces', 'actions'];
  dataSource: MatTableDataSource<Etudiant> = new MatTableDataSource<Etudiant>([]);
  data: any[] = [];
  errorMessage: string | null = null;
  yearsSchools: Array<{ idSchool: number; annee_scolaire: string, classE?: any[] }> = [];
  availableClasses: any[] = [];

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private paginatorIntl: MatPaginatorIntl
  ) {}

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  openAddYearDialog() {
    const dialogRef = this.dialog.open(AnneescolaireComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadYearsSchools();
      }
    });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.pageSize = 10;
    this.paginator.pageSizeOptions = [10, 20, 30, 40, 50];

    this.paginatorIntl.itemsPerPageLabel = 'Éléments par page';
    this.paginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      const of = ` sur ${length}`;
      return `${page * pageSize + 1} - ${Math.min((page + 1) * pageSize, length)}${of}`;
    };
    this.dataSource.filterPredicate = (data: Etudiant, filter: string): boolean => {
      return data.matricule.toString().toLowerCase().includes(filter);
    };

    // Load years first, then students
    this.loadYearsSchools();
  }

  loadYearsSchools(): void {
    this.http.get<{ data: any[] }>(`${environment.apiUrl}/years-school`).subscribe({
      next: (response) => {
        this.yearsSchools = response.data;
        
        // Extract all classes from all schools
        this.availableClasses = [];
        this.yearsSchools.forEach(y => {
          if (y.classE) {
            this.availableClasses.push(...y.classE);
          }
        });
        
        // Remove duplicates if necessary (using idCls)
        this.availableClasses = Array.from(new Map(this.availableClasses.map(c => [c.idCls, c])).values());

        // Load students after years are loaded
        const id = localStorage.getItem('userData');
        if (id) {
          this.loadClasses(id);
        }
      },
      error: (error) => {
        this.errorMessage = 'Impossible de charger les années scolaires.';
        console.error('Erreur lors du chargement des années scolaires :', error);
      },
    });
  }

  displayId(id: number): void {
    this.dialog.open(StudentIdDialogComponent, {
      width: '500px',
      panelClass: 'custom-dialog-panel',
      data: { id }
    });
  }

  displayIdE(id: number): void {
    this.dialog.open(StudentIdEDialogComponent, {
      width: '500px',
      panelClass: 'custom-dialog-panel',
      data: { id }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // loadClasses(id: string): void {
  //   this.http.get<any[]>('http://localhost:3000/api/etudiants').subscribe({
  //     next: (response) => {
  //       // console.log('Réponse API pour les étudiants:', response);
  
  //       const userData = JSON.parse(id); 
  //       const userId = userData.idUser;
  
  //       // console.log('ID Utilisateur de localStorage:', userId);
  
  //       const filteredData = response.filter(student => student.idUser === userId);
  
  //       // console.log('Étudiants filtrés :', filteredData);
  
  //       this.dataSource.data = this.mapData(filteredData, this.yearsSchools);
  //     },
  //     error: () => {
  //       this.errorMessage = 'Impossible de charger les classes.';
  //     }
  //   });
  // }




  loadClasses(id: string): void {
    this.http.get<any[]>(`${environment.apiUrl}/etudiants`).subscribe({
      next: (response) => {
        const userData = JSON.parse(id); 
        const userId = userData.idUser;
  
        const filteredData = response.filter(student => student.idUser === userId);
        
        console.log('Données brutes des étudiants:', filteredData);
        console.log('Années scolaires disponibles:', this.yearsSchools);

        const mappedData = this.mapData(filteredData, this.yearsSchools);
        
        console.log('Données mappées avec années scolaires:', mappedData);
  
        // 🔥 dernier ajouté en premier
        this.dataSource.data = mappedData.sort((a, b) => b.matricule - a.matricule);
      },
      error: () => {
        this.errorMessage = 'Impossible de charger les classes.';
      }
    });
  }
  

  mapData(data: any[], yearsSchools: Array<{ idSchool: number; annee_scolaire: string, classE?: any[] }>): Etudiant[] {
    return data.map((etudiant) => {
      let idSchool = etudiant.idSchool;
      if (etudiant.years_schools && etudiant.years_schools.length > 0) {
        // Obtenir la dernière année scolaire (idSchool le plus grand)
        const sortedYS = [...etudiant.years_schools].sort((a, b) => b.idSchool - a.idSchool);
        idSchool = sortedYS[0].idSchool;
      }

      const anneeScolaire = yearsSchools.find(year => year.idSchool === idSchool)?.annee_scolaire || 'Non spécifié';
      
      let className = etudiant.classe || 'Non spécifié';
      if (etudiant.classE && etudiant.classE.length > 0) {
        // Obtenir la dernière classe (idCls le plus grand)
        const sortedClassE = [...etudiant.classE].sort((a, b) => b.idCls - a.idCls);
        const lastIdCls = sortedClassE[0].idCls;
        
        className = 'Non spécifié';
        for (const year of yearsSchools) {
           if (year.classE) {
             const cls = year.classE.find((c: any) => c.idCls === lastIdCls);
             if (cls) {
               className = cls.name;
               break;
             }
           }
        }
      }

      console.log(`Étudiant ${etudiant.name} - idSchool: ${idSchool}, année trouvée: ${anneeScolaire}, classe: ${className}`);
      
      return {
        matricule: etudiant.idEdt,
        nom: etudiant.name,
        prenom: etudiant.surname,
        numero: etudiant.matricule,
        classe: className,
        anneeScolaire: anneeScolaire,
        image: etudiant.image,
        isActive: etudiant.isActive,
      };
    });
  }

  // addElement() {
  //   const newElement: Etudiant = {
  //     matricule: this.dataSource.data.length + 1,
  //     nom: 'Nom',
  //     prenom: 'Prénom',
  //     classe: 'Classe A',
  //     anneeScolaire: '2023-2024',
  //   };

  //   this.dataSource.data = [...this.dataSource.data, newElement];
  //   this.updatePaginator();
  // }

  deleteElement(matricule: number) {
    this.dataSource.data = this.dataSource.data.filter((student) => student.matricule !== matricule);
    this.updatePaginator();
  }

  private updatePaginator() {
    if (this.paginator) {
      this.paginator.length = this.dataSource.data.length;
      this.paginator.pageIndex = 0;
      this.dataSource.paginator = this.paginator;
    }
  }

  updateAnneeScolaire(student: Etudiant, newAnneeScolaire: string): void {
    const yearId = this.yearsSchools.find(year => year.annee_scolaire === newAnneeScolaire)?.idSchool;
    
    if (!yearId) {
      console.error('Année scolaire non trouvée:', newAnneeScolaire);
      return;
    }

    // Update local data first for immediate UI feedback
    student.anneeScolaire = newAnneeScolaire;

    // Call API to update database
    this.http.patch(`${environment.apiUrl}/etudiants/${student.matricule}`, {
      idSchool: yearId
    }).subscribe({
      next: () => {
        console.log('Année scolaire mise à jour avec succès');
        // Refresh data to ensure consistency
        this.loadClasses(localStorage.getItem('userData')!);
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour de l\'année scolaire:', error);
        // Revert change on error
        this.loadClasses(localStorage.getItem('userData')!);
      }
    });
  }

  updateClasse(student: Etudiant, newClasse: string): void {
    const clsId = this.availableClasses.find(c => c.name === newClasse)?.idCls;
    if (!clsId) {
      console.error('Classe non trouvée:', newClasse);
      return;
    }

    // Update local data first for immediate UI feedback
    student.classe = newClasse;

    // Call API to update database
    this.http.patch(`${environment.apiUrl}/etudiants/${student.matricule}`, {
      idCls: clsId
    }).subscribe({
      next: () => {
        console.log('Classe mise à jour avec succès');
        this.loadClasses(localStorage.getItem('userData')!);
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour de la classe:', error);
        this.loadClasses(localStorage.getItem('userData')!);
      }
    });
  }

  encode(id: any): string {
    return encodeId(id);
  }

  toggleAccess(student: Etudiant): void {
    const newStatus = !student.isActive;
    student.isActive = newStatus;
    
    this.http.patch(`${environment.apiUrl}/etudiants/${student.matricule}`, {
      isActive: newStatus
    }).subscribe({
      next: () => {
        console.log(`Statut d'accès mis à jour avec succès`);
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du statut:', error);
        student.isActive = !newStatus;
      }
    });
  }

}

export interface Etudiant {
  matricule: number;
  numero: number;
  nom: string;
  prenom: string;
  classe: string;
  anneeScolaire: string;
  image?: string;
  isActive?: boolean;
}
