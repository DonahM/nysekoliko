import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-bulletin-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, MatTooltipModule],
  providers: [DatePipe],
  templateUrl: './bulletin-dialog.component.html',
  styleUrls: ['./bulletin-dialog.component.css']
})
export class BulletinDialogComponent {
  currentDate = new Date();

  constructor(
    public dialogRef: MatDialogRef<BulletinDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  printBulletin(): void {
    const printContent = document.querySelector('.printable-a4') as HTMLElement;
    if (!printContent) return;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      // Gather all style sheets for perfect rendering
      let styles = '';
      try {
        styles = Array.from(document.styleSheets)
          .map(styleSheet => {
            try { return Array.from(styleSheet.cssRules).map(rule => rule.cssText).join(''); } 
            catch (e) { return ''; }
          }).join('');
      } catch (e) { console.warn(e); }

      printWindow.document.write(`
        <html>
          <head>
            <title>Bulletin de notes - ${this.data.etudiant?.nom || ''}</title>
            <style>
              ${styles}
              body { background: white; margin: 0; padding: 0; }
              .no-print { display: none !important; }
              .printable-a4 { 
                box-shadow: none !important; 
                width: 100% !important; 
                max-width: 210mm !important;
                height: auto !important;
                min-height: 0 !important;
                margin: 0 auto !important; 
                padding: 10mm !important; 
                box-sizing: border-box;
                page-break-inside: auto;
              }
              tr { page-break-inside: avoid; page-break-after: auto; }
              tbody tr:nth-child(12n) { page-break-after: always; }
              .summary-section, .footer-section, .school-header { page-break-inside: avoid; }
              @page { size: A4 portrait; margin: 5mm; }
            </style>
          </head>
          <body>
            <div class="printable-a4">
              ${printContent.innerHTML}
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      
      // Delay for styles and images to fully render before print dialog
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 700);
    } else {
      alert("La fenêtre d'impression a été bloquée. Veuillez autoriser les pop-ups pour ce site.");
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
