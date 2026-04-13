import { environment } from '../../../environments/environment';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-badge-dialog',
  templateUrl: './badge-dialog.component.html',
  styleUrls: ['./badge-dialog.component.css'],
  providers: [],
  imports: [MatDialogModule, MatButtonModule, MatIconModule, CommonModule, HttpClientModule, FormsModule],
})
export class BadgeDialogComponent implements OnInit {
  baseUrl = environment.baseUrl;
  anneesScolaires: any[] = [];
  classes: any[] = [];
  selectedYear: any = null;
  selectedClass: any = null;
  userLogo: string | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public student: any,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadDropdownData();
    this.loadUserLogo();
  }

  loadUserLogo(): void {
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        this.userLogo = parsedData.photo || parsedData.logo || null;
      } catch (e) {
        console.error('Error parsing userData', e);
      }
    }
  }

  loadDropdownData(): void {
    // Load Years
    this.http.get<any>(environment.apiUrl + '/years-school').subscribe({
      next: (res) => {
        this.anneesScolaires = Array.isArray(res?.data) ? res.data : (Array.isArray(res) ? res : []);
        // Sort years safely
        if (this.anneesScolaires.length > 0) {
          try {
            this.anneesScolaires.sort((a, b) => {
              if (a?.annee_scolaire && b?.annee_scolaire) {
                return String(a.annee_scolaire).localeCompare(String(b.annee_scolaire));
              }
              return 0;
            });
          } catch(e) {
            console.error('Sort failed', e);
          }
          const studentYear = this.anneesScolaires.find(y => y.idSchool == this.student?.idSchool);
          this.selectedYear = studentYear || this.anneesScolaires[this.anneesScolaires.length - 1];
        }
      },
      error: (err) => console.error('Error loading years', err)
    });

    // Load Classes
    this.http.get<any[]>(environment.apiUrl + '/classes').subscribe({
      next: (res) => {
        this.classes = res || [];
        if (this.classes.length > 0) {
          let studentClassId = this.student?.idCls;
          if (!studentClassId && this.student?.classE) {
            if (Array.isArray(this.student.classE) && this.student.classE.length > 0) {
              studentClassId = this.student.classE[0].idCls;
            } else if (this.student.classE.idCls) {
              studentClassId = this.student.classE.idCls;
            }
          }
          const studentClass = this.classes.find(c => c.idCls == studentClassId);
          this.selectedClass = studentClass || this.classes[this.classes.length - 1];
        }
      },
      error: (err) => console.error('Error loading classes', err)
    });
  }

  compareYear(y1: any, y2: any): boolean {
    return y1 && y2 ? y1.idSchool === y2.idSchool : y1 === y2;
  }

  compareClass(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.idCls === c2.idCls : c1 === c2;
  }

  getStudentClassName(): string {
    if (this.selectedClass && this.selectedClass.name) return this.selectedClass.name;
    if (this.student?.classE) {
      if (Array.isArray(this.student.classE) && this.student.classE.length > 0) {
        return this.student.classE[0].name || 'Non assignée';
      }
      if (this.student.classE.name) {
        return this.student.classE.name;
      }
    }
    return 'Non assignée';
  }

  getStudentYearName(): string {
    if (this.selectedYear && this.selectedYear.annee_scolaire) return this.selectedYear.annee_scolaire;
    if (this.student?.years_schools) {
      if (Array.isArray(this.student.years_schools) && this.student.years_schools.length > 0) {
        return this.student.years_schools[0].annee_scolaire || this.student.idSchool || 'N/A';
      }
      if (this.student.years_schools.annee_scolaire) {
        return this.student.years_schools.annee_scolaire;
      }
    }
    // Fallback to idSchool if nothing else is available
    return this.student?.idSchool ? String(this.student.idSchool) : 'N/A';
  }

  // Méthode pour obtenir les initiales de l'étudiant
  getStudentInitials(): string {
    if (!this.student) return '??';
    const first = this.student.name?.charAt(0) || '';
    const last = this.student.surname?.charAt(0) || '';
    return (first + last).toUpperCase();
  }

  // Méthode pour obtenir la date actuelle formatée
  getCurrentDate(): string {
    return new Date().toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  exportToPDF(): void {
    // 10x15 cm photo paper is 100x150 mm
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [100, 150]
    });
    const content = document.querySelector('.badge-dialog-container') as HTMLElement;

    if (content) {
      const self = this;
      doc.html(content, {
        callback: function(doc: any) {
          doc.save(`badge_${self.student?.name}_${self.student?.surname}.pdf`);
        },
        margin: [0, 0, 0, 0],
        x: 0,
        y: 0,
        width: 100, // Match the PDF width
        windowWidth: 500 // The CSS pixel width of our element
      });
    }
  }

  exportToJPG(): void {
    const content = document.querySelector('.badge-dialog-container') as HTMLElement;

    if (content) {
      html2canvas(content, {
        scale: 3, // scale 3 for 500x750 CSS size -> 1500x2250 pixels = High Quality 10x15cm photo
        useCORS: true,
        backgroundColor: '#ffffff',
        width: 500,
        height: 750,
        windowWidth: 1000, // Force desktop viewport size so responsive CSS doesn't shrink the badge
        onclone: (clonedDoc) => {
          // Remove max-height and overflow restrictions from the dialog content so html2canvas captures everything!
          const dialogContent = clonedDoc.querySelector('mat-dialog-content') as HTMLElement;
          if (dialogContent) {
            dialogContent.style.maxHeight = 'none';
            dialogContent.style.overflow = 'visible';
            dialogContent.style.padding = '0';
          }
          const container = clonedDoc.querySelector('.badge-dialog-container') as HTMLElement;
          if (container) {
            container.style.transform = 'none';
            container.style.margin = '0';
          }
        }
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const link = document.createElement('a');
        link.href = imgData;
        link.download = `badge_10x15_${this.student?.name}_${this.student?.surname}.jpg`;
        link.click();
      });
    }
  }

  printBadge(): void {
    const content = document.querySelector('.badge-dialog-container') as HTMLElement;
    
    if (content) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Badge Étudiant</title>
              <style>
                body { margin: 0; padding: 0; font-family: Arial, sans-serif; display: flex; justify-content: center; }
                /* Configure the print page for 10x15 cm photo paper */
                @page { size: 100mm 150mm; margin: 0; }
                .badge-dialog-container {
                  width: 100mm !important;
                  height: 150mm !important;
                  transform-origin: top left;
                }
              </style>
            </head>
            <body>
              ${content.innerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 500);
      }
    }
  }
}
