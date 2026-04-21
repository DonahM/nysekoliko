import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface DialogData {
  field: string;
  value: any;
}

@Component({
  selector: 'app-edit-student-dialog',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './edit-student-dialog.component.html',
  styleUrls: ['./edit-student-dialog.component.css'],
})
export class EditStudentDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditStudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  
  onNoClick(): void {
    if (this.data.value) {
      const confirmClose = confirm(
        'Voulez-vous vraiment annuler sans enregistrer ?'
      );
      if (!confirmClose) return;
    }
    this.dialogRef.close();
  }

  
  onSave(): void {
    this.dialogRef.close({ status: 'saved', value: this.data.value });
  }

  getFieldLabel(field: string): string {
    const labels: { [key: string]: string } = {
      'date_naiss': 'Date de naissance',
      'lieu_naiss': 'Lieu de naissance',
      'sexe': 'Sexe',
      'tel': 'Téléphone',
      'adress_edt': 'Adresse',
      'ecole_anter': 'Ancienne école',
      'father': 'Père',
      'mother': 'Mère',
      'titeur': 'Tuteur'
    };
    return labels[field] || field.charAt(0).toUpperCase() + field.slice(1);
  }
}
