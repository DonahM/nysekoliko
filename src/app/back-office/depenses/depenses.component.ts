import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DepensesService, Depense } from '../../services/depenses.service';
import { ClasseService } from '../../services/classe.service';

@Component({
  selector: 'app-depenses',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatIconModule, MatButtonModule, MatTableModule, MatInputModule, MatSelectModule],
  templateUrl: './depenses.component.html',
  styleUrls: ['./depenses.component.css']
})
export class DepensesComponent implements OnInit {
  depenses: Depense[] = [];
  displayedColumns: string[] = ['date', 'titre', 'categorie', 'valeur', 'actions'];
  yearsSchools: any[] = [];
  selectedSchoolId: number | null = null;
  
  newDepense: Partial<Depense> = {
    titre: '',
    description: '',
    categorie: 'Autre',
    valeur: 0,
    date: new Date().toISOString().split('T')[0],
    mois: this.getCurrentMonth()
  };
  showAddForm = false;
  categories = ['Achat', 'Facture', 'Entretien', 'Événement', 'Autre'];

  constructor(
    private depensesService: DepensesService,
    private classeService: ClasseService
  ) {}

  ngOnInit() {
    this.classeService.getYearsSchools().subscribe({
      next: (res) => {
        this.yearsSchools = res.data;
        if (this.yearsSchools.length > 0) {
          this.selectedSchoolId = this.yearsSchools[0].idSchool;
          this.loadDepenses();
        }
      }
    });
  }

  getCurrentMonth() {
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    return months[new Date().getMonth()];
  }

  loadDepenses() {
    if (this.selectedSchoolId) {
      this.depensesService.getDepenses(this.selectedSchoolId).subscribe(res => {
        this.depenses = res;
      });
    }
  }

  onSchoolChange() {
    this.loadDepenses();
  }

  saveDepense() {
    if (!this.selectedSchoolId) return;
    
    // Extrait l'idUser depuis le localStorage
    let idUser = undefined;
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      idUser = parsedData.idUser;
    }

    const payload: Depense = {
      titre: this.newDepense.titre!,
      description: this.newDepense.description,
      categorie: this.newDepense.categorie,
      valeur: this.newDepense.valeur!,
      date: this.newDepense.date!,
      mois: this.newDepense.mois,
      idSchool: this.selectedSchoolId,
      idUser
    };

    this.depensesService.createDepense(payload).subscribe(() => {
      this.loadDepenses();
      this.cancelAdd();
    });
  }

  deleteDepense(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cette dépense ?')) {
      this.depensesService.deleteDepense(id).subscribe(() => {
        this.loadDepenses();
      });
    }
  }

  cancelAdd() {
    this.showAddForm = false;
    this.newDepense = {
      titre: '',
      description: '',
      categorie: 'Autre',
      valeur: 0,
      date: new Date().toISOString().split('T')[0],
      mois: this.getCurrentMonth()
    };
  }
}

