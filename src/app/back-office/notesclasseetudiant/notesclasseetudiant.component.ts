import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { decodeId } from '../../shared/utils/crypto.utils';
import { ClasseService } from '../../services/classe.service';
import { Etudiant } from '../../models/etudiant.model';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Matiere } from '../../models/matiere.model';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BulletinDialogComponent } from './bulletin-dialog/bulletin-dialog.component';

@Component({
  selector: 'app-notesclasseetudiant',
  imports: [HttpClientModule, CommonModule, FormsModule, MatButtonModule, MatIconModule, MatDialogModule, MatTooltipModule],
  providers: [ClasseService],
  templateUrl: './notesclasseetudiant.component.html',
  styleUrls: ['./notesclasseetudiant.component.css']
})
export class NotesclasseetudiantComponent implements OnInit {
  idCls: string | null = null;
  students: Etudiant[] = [];
  matieres: Matiere[] = [];
  allMatieres: Matiere[] = [];
  years: any[] = [];
  semestres: any[] = [];
  selectedYearId: number | null = null;
  selectedSemId: number | null = null;
  studentRanks: Map<number, number> = new Map();
  classeInfo: any = null;
  schoolInfo: any = { name: 'ÉCOLE SYSTEM', email: 'contact@ecole.mg', tel: '+261 34 00 000 00' };

  constructor(
    private route: ActivatedRoute,
    private classeService: ClasseService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const encodedId = params.get('idCls');
      this.idCls = encodedId ? decodeId(encodedId) : null;
      console.log('Classe ID:', this.idCls); 
      if (this.idCls) {
        this.loadStudents(this.idCls);
        this.loadMatieres(this.idCls);
        this.loadYears();
        this.loadSemestres();
      } else {
        console.error('Aucun ID trouvé dans l\'URL');
      }
    });
  }

  loadStudents(idCls: string): void {
    this.classeService.getStudentsByClass(Number(idCls)).subscribe(
      data => {
        this.students = (data || []).map((item: any) => {
          const student = item?.etudiants ?? item;
          return {
            ...student,
            name: student?.name ?? student?.nom ?? '',
            surname: student?.surname ?? student?.prenom ?? ''
          };
        });
      },
      error => {
        console.error('Erreur lors de la récupération des étudiants de la classe :', error);
      }
    );

    // Conserver le chargement de la classe pour l'année scolaire par défaut
    this.classeService.getClasses().subscribe(data => {
      const classe = data.find(c => c.idCls.toString() === idCls);
      if (classe) {
        this.classeInfo = classe;
        if (classe.idSchool && !this.selectedYearId) {
          this.selectedYearId = classe.idSchool;
        }
      }
    });

    const userDataStr = localStorage.getItem('userData');
    if (userDataStr) {
      try {
        const user = JSON.parse(userDataStr);
        this.schoolInfo = {
          name: (user.name + ' ' + (user.surname || '')).trim() || 'ÉCOLE SYSTEM',
          email: user.email || 'contact@ecole.mg',
          tel: user.cin || '+261 34 00 000 00', // Cin appears to hold custom codes/tels in some setups
          logo: user.logo || null
        };
      } catch (e) {}
    }
  }

  loadMatieres(idCls: string): void {
    this.classeService.getMatieres().subscribe(data => {
      this.allMatieres = data.filter(matiere =>
        matiere.notes.some(note => note.idCls.toString() === idCls)
      );
      this.applyFilters();
    }, error => {
      console.error('Erreur lors de la récupération des matières :', error);
    });
  }

  loadYears(): void {
    this.classeService.getYearsSchools().subscribe(response => {
      this.years = Array.isArray(response?.data) ? response.data : (Array.isArray(response) ? response : []);
      this.applyFilters();
    }, error => {
      console.error('Erreur lors de la récupération des années scolaires :', error);
    });
  }

  onYearChange(): void {
    this.applyFilters();
  }

  onSemestreChange(): void {
    this.applyFilters();
  }

  loadSemestres(): void {
    this.classeService.getSemestres().subscribe(data => {
      this.semestres = Array.isArray(data) ? data : [];
      this.applyFilters();
    }, error => {
      console.error('Erreur lors de la récupération des semestres :', error);
    });
  }

  private matchesNoteFilters(note: any, studentId?: number): boolean {
    const sameClass = note.idCls.toString() === this.idCls;
    const sameYear = this.selectedYearId ? note.idSchool === this.selectedYearId : true;
    const sameSem = this.selectedSemId ? note.idSem === this.selectedSemId : true;
    const sameStudent = studentId !== undefined ? note.idEdt === studentId : true;
    return sameClass && sameYear && sameSem && sameStudent;
  }

  private applyFilters(): void {
    this.matieres = this.allMatieres.filter(matiere =>
      matiere.notes.some(note => this.matchesNoteFilters(note))
    );
    this.calculateStudentRanks();
  }
  
  getNoteForStudent(studentId: number, matiere: Matiere): number | string {
    const note = matiere.notes.find(n => this.matchesNoteFilters(n, studentId));
    return note ? note.note : '-'; 
  }
  calculateAverageForStudent(studentId: number): number | string {
    let totalWeightedNotes = 0;
    let totalCoefficients = 0;
    let hasValidNotes = false;

    this.matieres.forEach(matiere => {
      const noteObj = matiere.notes.find(note => this.matchesNoteFilters(note, studentId));
      if (noteObj && noteObj.note !== undefined && noteObj.note !== null && noteObj.coefficient > 0) {
        totalWeightedNotes += noteObj.note * noteObj.coefficient;
        totalCoefficients += noteObj.coefficient;
        hasValidNotes = true;
      }
    });

    if (hasValidNotes && totalCoefficients > 0) {
      const average = totalWeightedNotes / totalCoefficients;
      return Math.round(average * 100) / 100; // Arrondi à 2 décimales
    }
    return '-';
  }

getCoefficientForMatiere(matiere: Matiere): number | string {
  // 1) Priorite: coefficient de la classe + annee + semestre selectionnes
  const noteForFilters = matiere.notes.find(n => this.matchesNoteFilters(n));

  if (noteForFilters?.coefficient !== undefined && noteForFilters?.coefficient !== null) {
    return noteForFilters.coefficient;
  }

  // 2) Fallback: coefficient de la classe (toutes annees et semestres)
  const noteForClass = matiere.notes.find(n => n.idCls.toString() === this.idCls);
  if (noteForClass?.coefficient !== undefined && noteForClass?.coefficient !== null) {
    return noteForClass.coefficient;
  }

  return '-';
}

getTotalNotesForStudent(studentId: number): number {
  let totalNotes = 0;

  this.matieres.forEach(matiere => {
    matiere.notes.forEach(note => {
      if (this.matchesNoteFilters(note, studentId)) {
        totalNotes += note.note; 
      }
    });
  });

  return totalNotes;
}

getTotalCoefficients(studentId: string): number {
  let totalCoefficients = 0;

  this.matieres.forEach(matiere => {
    matiere.notes.forEach(note => {
      if (this.matchesNoteFilters(note, Number(studentId))) {
        totalCoefficients += note.coefficient;
      }
    });
  });

  return totalCoefficients;
}

  getStudentDisplayName(student: any): string {
    const firstName = student?.name ?? student?.nom ?? '';
    const lastName = student?.surname ?? student?.prenom ?? '';
    const fullName = `${firstName} ${lastName}`.trim();
    return fullName || 'Nom indisponible';
  }

  calculateStudentRanks(): void {
    const studentAverages: { studentId: number; average: number }[] = [];
    
    // Calculer les moyennes pour tous les étudiants
    this.students.forEach(student => {
      const avg = this.calculateAverageForStudent(student.idEdt);
      if (typeof avg === 'number') {
        studentAverages.push({
          studentId: student.idEdt,
          average: avg
        });
      }
    });
    
    // Trier par moyenne décroissante
    studentAverages.sort((a, b) => b.average - a.average);
    
    // Attribuer les rangs (gérer les ex-aequo)
    this.studentRanks.clear();
    let currentRank = 1;
    
    for (let i = 0; i < studentAverages.length; i++) {
      const current = studentAverages[i];
      
      if (i === 0) {
        this.studentRanks.set(current.studentId, currentRank);
      } else {
        const previous = studentAverages[i - 1];
        if (current.average === previous.average) {
          // Ex-aequo - même rang que le précédent
          this.studentRanks.set(current.studentId, currentRank);
        } else {
          currentRank = i + 1;
          this.studentRanks.set(current.studentId, currentRank);
        }
      }
    }
  }

  getStudentRank(studentId: number): number | string {
    const rank = this.studentRanks.get(studentId);
    return rank !== undefined ? rank : '-';
  }

  getRankDisplay(rank: number | string): string {
    if (typeof rank === 'string' || rank === 0) return '-';
    
    // Affichage du rang avec suffixe (1er, 2e, 3e, etc.)
    if (rank === 1) return `${rank}er`;
    if (rank === 2) return `${rank}e`;
    return `${rank}e`;
  }

  openBulletin(student: any): void {
    const yearName = this.years.find(y => y.idSchool === this.selectedYearId)?.annee_scolaire || 'Toutes les années';
    const semName = this.semestres.find(s => s.idSem === this.selectedSemId)?.name || 'Tous les semestres';

    const results = this.matieres.map(matiere => {
      const note = this.getNoteForStudent(student.idEdt, matiere);
      const coeff = this.getCoefficientForMatiere(matiere);
      const isNoteNum = typeof note === 'number';
      const isCoeffNum = typeof coeff === 'number';
      
      const total = (isNoteNum && isCoeffNum) ? note * coeff : '-';
      
      let remark = '';
      if (isNoteNum) {
        if (note >= 16) remark = 'Excellent';
        else if (note >= 14) remark = 'Bien';
        else if (note >= 12) remark = 'Assez Bien';
        else if (note >= 10) remark = 'Passable';
        else remark = 'Peut mieux faire';
      }

      return {
        matiere: matiere.name,
        coeff: coeff !== '-' ? coeff : 1,
        note: note,
        total: total,
        remark: remark
      };
    });

    const average = this.calculateAverageForStudent(student.idEdt);
    const totalCoeffs = results.reduce((acc, curr) => typeof curr.coeff === 'number' ? acc + curr.coeff : acc, 0);
    const totalPoints = results.reduce((acc, curr) => typeof curr.total === 'number' ? acc + curr.total : acc, 0);
    const rank = this.getRankDisplay(this.getStudentRank(student.idEdt));

    this.dialog.open(BulletinDialogComponent, {
      width: '100%',
      maxWidth: '1000px',
      data: {
        student: student,
        classeName: this.classeInfo?.name || `Classe ${this.idCls}`,
        year: yearName,
        semestre: semName,
        schoolInfo: this.schoolInfo,
        totalStudents: this.students.length,
        results: results,
        summary: {
          totalCoeffs: totalCoeffs,
          totalNotes: totalPoints,
          average: average,
          rank: rank
        }
      }
    });
  }

  /**
   * Recharge la page actuelle après un enregistrement
   */
  reloadPage(): void {
    // Récupérer l'URL actuelle avec tous les paramètres
    const currentUrl = this.router.url;
    
    // Naviguer vers la même page pour forcer le rechargement
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  /**
   * Recharge les données de la page (alternative plus douce)
   */
  refreshData(): void {
    if (this.idCls) {
      // Ajouter une classe de chargement au bouton (si vous avez une référence)
      console.log('Rechargement des données...');
      
      // Recharger toutes les données
      this.loadStudents(this.idCls);
      this.loadMatieres(this.idCls);
      this.loadYears();
      this.loadSemestres();
      
      // Optionnel: afficher une notification de succès
      setTimeout(() => {
        console.log('Données rechargées avec succès');
      }, 500);
    }
  }

  /**
   * Helpers pour la couleur des notes dans le HTML (Type Safe)
   */
  isExcellent(val: number | string): boolean {
    return typeof val === 'number' && val >= 16;
  }

  isGood(val: number | string): boolean {
    return typeof val === 'number' && val >= 12 && val < 16;
  }

  isWarning(val: number | string): boolean {
    return typeof val === 'number' && val >= 10 && val < 12;
  }

  isDanger(val: number | string): boolean {
    return typeof val === 'number' && val < 10;
  }

}
