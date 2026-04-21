import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-edit-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {
  editForm: FormGroup;
  selectedRoles = {
    admin: false,
    user: false,
    enseignant: false
  };
  hasSupperAdmin: boolean = false;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: any }
  ) {
    this.editForm = this.fb.group({
      name: [this.data.user.name, Validators.required],
      surname: [this.data.user.surname, Validators.required],
      cin: [this.data.user.cin, Validators.required],
      email: [this.data.user.email, [Validators.required, Validators.email]],
      lieu: [this.data.user.lieu, Validators.required]
    });

    if (this.data.user.roles) {
      let roles: any = [];
      
      if (typeof this.data.user.roles === 'string') {
        try {
          roles = JSON.parse(this.data.user.roles);
        } catch (e) {
          // If it's a simple string like 'SUPPER ADMIN' or 'ADMIN, USER'
          roles = this.data.user.roles.split(',').map((r: string) => r.trim());
        }
      } else {
        roles = this.data.user.roles;
      }
        
      if (Array.isArray(roles)) {
        this.hasSupperAdmin = roles.includes('SUPPER ADMIN');
        this.selectedRoles.admin = roles.includes('ADMIN') || this.hasSupperAdmin;
        this.selectedRoles.user = roles.includes('USER');
        this.selectedRoles.enseignant = roles.includes('ENSEIGNANT');
      } else if (typeof roles === 'string') {
        this.hasSupperAdmin = roles.includes('SUPPER ADMIN');
        this.selectedRoles.admin = roles.includes('ADMIN') || this.hasSupperAdmin;
        this.selectedRoles.user = roles.includes('USER');
        this.selectedRoles.enseignant = roles.includes('ENSEIGNANT');
      }
    }
  }

  ngOnInit(): void {}

  onRoleChange(role: 'admin' | 'user' | 'enseignant', event: any) {
    this.selectedRoles[role] = event.checked;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit() {
    if (this.editForm.valid) {
      const formValue = this.editForm.value;
      
      const rolesArray = [];
      if (this.selectedRoles.admin) {
        if (this.hasSupperAdmin) {
           rolesArray.push('SUPPER ADMIN');
           // Optionnellement garder les deux
           rolesArray.push('ADMIN');
        } else {
           rolesArray.push('ADMIN');
        }
      }
      if (this.selectedRoles.user) rolesArray.push('USER');
      if (this.selectedRoles.enseignant) rolesArray.push('ENSEIGNANT');
      
      const updateData = {
        ...this.data.user,
        ...formValue,
        roles: rolesArray
      };

      if (this.selectedFile) {
        this.userService.uploadLogo(this.selectedFile).subscribe({
          next: (uploadResponse) => {
            updateData.logo = uploadResponse.filePath;
            this.executeUpdate(updateData);
          },
          error: (error) => {
            console.error('Erreur lors du upload du logo:', error);
            alert('Erreur lors de l\'upload du nouveau logo.');
          }
        });
      } else {
        this.executeUpdate(updateData);
      }
    }
  }

  executeUpdate(updateData: any) {
    this.userService.updateUser(this.data.user.idUser, updateData).subscribe({
      next: (response) => {
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors de la modification');
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
