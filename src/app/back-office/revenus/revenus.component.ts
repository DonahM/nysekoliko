import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RevenusService, Revenu } from '../../services/revenus.service';
import { ClasseService } from '../../services/classe.service';

@Component({
  selector: 'app-revenus',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatIconModule, MatButtonModule, MatTableModule, MatInputModule, MatSelectModule],
  templateUrl: './revenus.component.html',
  styleUrls: ['./revenus.component.css']
})
export class RevenusComponent implements OnInit {
  revenus: Revenu[] = [];
  displayedColumns: string[] = ['date', 'titre', 'categorie', 'valeur', 'actions'];
  yearsSchools: any[] = [];
  selectedSchoolId: number | null = null;
  
  newRevenu: Partial<Revenu> = {
    titre: '',
    description: '',
    categorie: 'Vente',
    valeur: 0,
    date: new Date().toISOString().split('T')[0],
    mois: this.getCurrentMonth()
  };
  showAddForm = false;
  categories = ['Vente', 'Donation', 'Subvention', 'Événement', 'Autre'];

  constructor(
    private revenusService: RevenusService,
    private classeService: ClasseService
  ) {}

  ngOnInit() {
    this.classeService.getYearsSchools().subscribe({
      next: (res) => {
        this.yearsSchools = res.data;
        if (this.yearsSchools.length > 0) {
          this.selectedSchoolId = this.yearsSchools[0].idSchool;
          this.loadRevenus();
        }
      }
    });
  }

  getCurrentMonth() {
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    return months[new Date().getMonth()];
  }

  loadRevenus() {
    if (this.selectedSchoolId) {
      this.revenusService.getRevenus(this.selectedSchoolId).subscribe(res => {
        this.revenus = res;
      });
    }
  }

  onSchoolChange() {
    this.loadRevenus();
  }

  saveRevenu() {
    if (!this.selectedSchoolId) return;
    
    // Extrait l'idUser depuis le localStorage
    let idUser = undefined;
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      idUser = parsedData.idUser;
    }

    const payload: Revenu = {
      titre: this.newRevenu.titre!,
      description: this.newRevenu.description,
      categorie: this.newRevenu.categorie,
      valeur: this.newRevenu.valeur!,
      date: this.newRevenu.date!,
      mois: this.newRevenu.mois,
      idSchool: this.selectedSchoolId,
      idUser
    };

    this.revenusService.createRevenu(payload).subscribe(() => {
      this.loadRevenus();
      this.cancelAdd();
    });
  }

  deleteRevenu(id: number) {
    if (confirm('Voulez-vous vraiment supprimer ce revenu ?')) {
      this.revenusService.deleteRevenu(id).subscribe(() => {
        this.loadRevenus();
      });
    }
  }

  cancelAdd() {
    this.showAddForm = false;
    this.newRevenu = {
      titre: '',
      description: '',
      categorie: 'Vente',
      valeur: 0,
      date: new Date().toISOString().split('T')[0],
      mois: this.getCurrentMonth()
    };
  }
}
