import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatIconModule
  ],
  providers: [UserService],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  user = {
    name: '',
    surname: '',
    cin: '',
    email: '',
    roles: [] as string[],
    logo: '',
    lieu: '',
    password: '',
    drene: '',
    cisco: '',
    zap: '',
    code: ''
  };
  selectedRoles = {
    admin: false,
    user: false,
    enseignant: false
  };

  selectedFile: File | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const userDataStr = localStorage.getItem('userData');
    if (userDataStr) {
      const user = JSON.parse(userDataStr);
      if (!user.roles || !user.roles.includes('SUPPER ADMIN')) {
        this.router.navigate(['/back-office']);
      }
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit() {
    this.user.roles = [];
    
    if (this.selectedRoles.admin) this.user.roles.push('ADMIN');
    if (this.selectedRoles.user) this.user.roles.push('USER');
    if (this.selectedRoles.enseignant) this.user.roles.push('ENSEIGNANT');

    if (this.user.name && this.user.surname && this.user.cin && this.user.email && this.user.roles.length && this.user.lieu && this.user.password) {
      if (this.selectedFile) {
        this.userService.uploadLogo(this.selectedFile).subscribe({
          next: (uploadResponse) => {
            console.log('Logo uploadé avec succès:', uploadResponse);
            this.user.logo = uploadResponse.filePath;
            this.createUser();
          },
          error: (error) => {
            console.error('Erreur lors du upload du logo:', error);
            alert(`Erreur Upload: ${error.status} - ${error.statusText}.`);
          }
        });
      } else {
        this.createUser();
      }
    } else {
      alert('Tous les champs sont requis.');
    }
  }

  createUser() {
    this.userService.addUser(this.user).subscribe({
      next: (response) => {
        console.log('Utilisateur ajouté avec succès:', response);
        alert('Utilisateur ajouté avec succès!');
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
        alert(`Erreur: ${error.status} - ${error.statusText}. Détails: ${error.error?.message || error.error}`);
      }
    });
  }
}
