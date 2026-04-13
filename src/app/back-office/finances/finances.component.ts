import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FinancesService, Bilan } from '../../services/finances.service';
import { DepensesService, Depense } from '../../services/depenses.service';
import { ClasseService } from '../../services/classe.service';

@Component({
  selector: 'app-finances',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatIconModule, MatSelectModule, MatButtonModule],
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.css']
})
export class FinancesComponent implements OnInit {
  abs(value: number): number {
    return Math.abs(value);
  }
  yearsSchools: any[] = [];
  selectedSchoolId: number | null = null;
  bilanGlobal: Bilan | null = null;
  depenses: Depense[] = [];
  months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  selectedMonth: string = '';

  constructor(
    private financesService: FinancesService,
    private depensesService: DepensesService,
    private classeService: ClasseService
  ) {}

  ngOnInit() {
    this.classeService.getYearsSchools().subscribe({
      next: (res) => {
        this.yearsSchools = res.data;
        if (this.yearsSchools.length > 0) {
          this.selectedSchoolId = this.yearsSchools[0].idSchool;
          this.loadBilan();
        }
      }
    });
  }

  loadBilan() {
    if (!this.selectedSchoolId) return;

    if (this.selectedMonth) {
      this.financesService.getBilanMois(this.selectedSchoolId, this.selectedMonth).subscribe(res => {
        this.bilanGlobal = res;
      });
      // Optionally load depenses specific to this month? DepensesService gets all by idSchool for now.
    } else {
      this.financesService.getBilanGlobal(this.selectedSchoolId).subscribe(res => {
        this.bilanGlobal = res;
      });
    }
  }

  onFilterChange() {
    this.loadBilan();
  }
}

