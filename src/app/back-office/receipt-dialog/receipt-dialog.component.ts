import { environment } from '../../../environments/environment';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-receipt-dialog',
  standalone: true,
  templateUrl: './receipt-dialog.component.html',
  styleUrls: ['./receipt-dialog.component.css'],
  imports: [MatDialogModule, MatButtonModule, MatIconModule, CommonModule]
})
export class ReceiptDialogComponent implements OnInit {
  baseUrl = environment.baseUrl;
  userLogo: string | null = null;
  schoolName: string = 'NySekoliko';
  receiptDate: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.receiptDate = new Date().toLocaleDateString('fr-FR', {
      day: '2-digit', month: 'long', year: 'numeric'
    });
    this.loadUserLogo();
  }

  loadUserLogo(): void {
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        this.userLogo = parsedData.photo || parsedData.logo || null;
        if(parsedData.lieu) {
          this.schoolName = parsedData.lieu;
        }
      } catch (e) {
        console.error('Error parsing userData', e);
      }
    }
  }

  printReceipt(): void {
    const content = document.querySelector('.receipt-wrapper') as HTMLElement;
    if (content) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Reçu ${this.data.type === 'ecolage' ? "d'Écolage" : "de Salaire"}</title>
              <style>
                body { margin: 0; padding: 20px; font-family: Arial, sans-serif; display: flex; justify-content: center; }
                @page { size: A5 landscape; margin: 0; }
                .receipt-wrapper {
                  width: 190mm;
                  height: auto;
                  border: 1px solid #ccc;
                  padding: 20px;
                  box-sizing: border-box;
                }
                /* Copiez ici les styles importants de css pour l'impression si nécessaire */
                .receipt-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px;}
                .school-info { display: flex; align-items: center; gap: 15px; }
                .school-info img { width: 60px; height: 60px; object-fit: contain; }
                .school-info h2 { margin: 0; font-size: 24px; color: #1e293b; }
                .receipt-title h1 { margin: 0; font-size: 28px; color: #3b82f6; text-transform: uppercase; letter-spacing: 2px;}
                .receipt-title p { margin: 5px 0 0 0; color: #64748b; font-size: 14px; text-align: right;}
                .receipt-details { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
                .info-block { background: #f8fafc; padding: 15px; border-radius: 8px; }
                .info-label { font-size: 12px; color: #64748b; text-transform: uppercase; margin-bottom: 5px; display: block;}
                .info-value { font-size: 16px; color: #0f172a; font-weight: bold; margin: 0;}
                .amount-row { display: flex; justify-content: space-between; align-items: center; background: #e0f2fe; padding: 20px; border-radius: 8px; margin-bottom: 40px;}
                .amount-label { font-size: 18px; color: #0369a1; font-weight: bold;}
                .amount-value { font-size: 32px; color: #0284c7; font-weight: 900;}
                .receipt-footer { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 40px;}
                .signature-box { border-top: 1px dashed #cbd5e1; width: 200px; text-align: center; padding-top: 10px; color: #64748b;}
              </style>
            </head>
            <body>
              <div class="receipt-wrapper">
                ${content.innerHTML}
              </div>
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

  exportToPDF(): void {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a5'
    });
    const content = document.querySelector('.receipt-wrapper') as HTMLElement;

    if (content) {
      html2canvas(content, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        width: 794,  // A5 width in pixels at 96 DPI approx
        height: 559  // A5 height
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        doc.addImage(imgData, 'PNG', 0, 0, 210, 148);
        doc.save(`Recu_${this.data.type}_${this.receiptDate}.pdf`);
      });
    }
  }
}
