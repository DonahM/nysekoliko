import { environment } from '../../../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-ecole',
  standalone: true,
  imports: [
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [UserService],
  templateUrl: './ecole.component.html',
  styleUrls: ['./ecole.component.css'],
})
export class EcoleComponent implements OnInit {
  baseUrl = environment.baseUrl;
  displayedColumns: string[] = ['logo', 'idUser', 'name', 'surname', 'cin', 'email', 'roles', 'lieu', 'isActive', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  constructor(private userService: UserService, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    const userDataStr = localStorage.getItem('userData');
    if (userDataStr) {
      const user = JSON.parse(userDataStr);
      if (!user.roles || !user.roles.includes('SUPPER ADMIN')) {
        this.router.navigate(['/back-office']);
        return;
      }
    }
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des données :', error);
      }
    );
  }

  toggleStatus(element: any): void {
    const action = element.isActive ? 'désactiver' : 'activer';
    if (confirm(`Voulez-vous vraiment ${action} cet utilisateur ?`)) {
      this.userService.toggleStatus(element.idUser).subscribe({
        next: () => {
          this.loadUsers();
        },
        error: (err) => {
          console.error('Erreur toggle status:', err);
          alert('Erreur lors du changement de statut');
        }
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editUser(user: any): void {
    // Pour l'instant, rediriger vers une page de modification
    // Plus tard, vous pouvez implémenter un dialogue ici
    console.log('Modifier utilisateur:', user);
    
    // Option 1: Rediriger vers une page de modification
    // this.router.navigate(['/back-office/ecole/edit-user', user.idUser]);
    
    // Option 2: Afficher un message temporaire
    alert(`Fonctionnalité de modification pour l'école: ${user.name} ${user.surname}\n\nCette fonctionnalité sera bientôt disponible avec un formulaire de modification complet.`);
    
    // Option 3: Vous pouvez créer un dialogue ici plus tard
    // const dialogRef = this.dialog.open(EditUserDialogComponent, {
    //   width: '600px',
    //   data: { user: user }
    // });
  }
}
