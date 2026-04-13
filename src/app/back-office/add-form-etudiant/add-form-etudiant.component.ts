import { environment } from '../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-add-form-etudiant',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './add-form-etudiant.component.html'
})
export class AddFormEtudiantComponent implements OnInit {
  baseUrl = environment.baseUrl;
  studentForm: FormGroup = new FormGroup({});
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  uploadError: string | null = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.studentForm = this.fb.group({
      // Informations personnelles
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      date_naiss: ['', Validators.required],
      lieu_naiss: ['', Validators.required],
      sexe: ['', Validators.required],
      tel: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      adress_edt: ['', Validators.required],
      matricule: ['', Validators.required],
      
      // Informations parents
      father: [''],
      jobs_f: [''],
      mother: [''],
      jobs_m: [''],
      tel_parent: ['', Validators.pattern('^[0-9]{10}$')],
      adresse_parent: [''],
      
      // Tuteur
      tuteur: [''],
      tel_titeur: ['', Validators.pattern('^[0-9]{10}$')],
      adress_titeur: [''],
      
      // Autres informations
      ecole_anter: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      image: ['']
    });
  }

  ngOnInit(): void {
    console.log('Composant initialisé');
    console.log('Formulaire créé:', this.studentForm);
    
    // S'assurer que le formulaire est bien initialisé
    if (!this.studentForm) {
      console.error('Le formulaire n\'est pas initialisé');
      this.initializeForm();
    }
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      // Validation du type de fichier
      if (!file.type.startsWith('image/')) {
        this.uploadError = 'Veuillez sélectionner une image valide.';
        return;
      }

      // Validation de la taille (max 2MB)
      const maxSize = 2 * 1024 * 1024;
      if (file.size > maxSize) {
        this.uploadError = 'L\'image est trop grande. Veuillez choisir une image de moins de 2MB.';
        return;
      }

      this.selectedFile = file;
      this.uploadError = null;
      
      // Nettoyer l'ancienne URL de prévisualisation
      if (this.previewUrl) {
        URL.revokeObjectURL(this.previewUrl);
      }
      
      // Créer une URL pour la prévisualisation
      this.previewUrl = URL.createObjectURL(file);
      
      // Convertir en base64
      this.convertToBase64(file);
    }
  }

  convertToBase64(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      this.studentForm.patchValue({ image: base64String });
      console.log('Image convertie en base64 avec succès');
    };
    reader.onerror = () => {
      this.uploadError = 'Erreur lors du traitement de l\'image.';
      console.error('Erreur lors de la conversion en base64');
    };
    reader.readAsDataURL(file);
  }

  removeImage(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    // Nettoyer la prévisualisation
    if (this.previewUrl) {
      URL.revokeObjectURL(this.previewUrl);
      this.previewUrl = null;
    }
    
    // Réinitialiser le fichier et le formulaire
    this.selectedFile = null;
    this.studentForm.patchValue({ image: '' });
    this.uploadError = null;
    
    // Réinitialiser l'input file
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  triggerFileSelect(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      this.isLoading = true;
      
      const submitStudent = (imageUrl: string) => {
        // Récupérer l'ID utilisateur depuis localStorage
        const userDataStr = localStorage.getItem('userData');
        let idUser = 1; // Valeur par défaut
        
        if (userDataStr) {
          try {
            const userData = JSON.parse(userDataStr);
            idUser = userData.idUser || userData.id || 1;
          } catch (e) {
            console.error('Erreur de parsing userData:', e);
          }
        }

        // Créer le payload avec uniquement les champs nécessaires
        const formValue = this.studentForm.value;
        const payload = {
          // Informations personnelles
          name: formValue.name?.trim() || '',
          surname: formValue.surname?.trim() || '',
          date_naiss: formValue.date_naiss || '',
          lieu_naiss: formValue.lieu_naiss?.trim() || '',
          sexe: formValue.sexe || '',
          tel: formValue.tel || '',
          adress_edt: formValue.adress_edt?.trim() || '',
          matricule: Number(formValue.matricule) || 0,
          
          // Informations parents
          father: formValue.father?.trim() || '',
          jobs_f: formValue.jobs_f?.trim() || '',
          mother: formValue.mother?.trim() || '',
          jobs_m: formValue.jobs_m?.trim() || '',
          tel_parent: formValue.tel_parent || '',
          adresse_parent: formValue.adresse_parent?.trim() || '',
          
          // Tuteur
          titeur: formValue.tuteur?.trim() || '',
          tel_titeur: formValue.tel_titeur || '',
          adress_titeur: formValue.adress_titeur?.trim() || '',
          
          // Autres informations
          ecole_anter: formValue.ecole_anter?.trim() || '',
          image: imageUrl || '',
          password: formValue.password || '',
          idUser: idUser
        };

        console.log('Payload envoyé à l\'API:', payload);

        // Envoyer les données au backend
        this.http.post(environment.apiUrl + '/etudiants', payload)
          .subscribe({
            next: (response) => {
              console.log('Étudiant ajouté avec succès:', response);
              this.isLoading = false;
              this.showSuccessMessage();
              this.resetForm();
            },
            error: (error) => {
              console.error('Erreur lors de l\'ajout de l\'étudiant:', error);
              console.error('Détails de l\'erreur:', error.error);
              this.isLoading = false;
              
              // Afficher un message d'erreur détaillé
              const errorMessage = error.error?.message || 'Erreur lors de l\'ajout de l\'étudiant';
              this.showErrorMessage(errorMessage);
            }
          });
      };

      if (this.selectedFile) {
        // Upload de l'image d'abord
        const formData = new FormData();
        formData.append('image', this.selectedFile);

        this.http.post(environment.apiUrl + '/etudiants/upload', formData).subscribe({
          next: (response: any) => {
            console.log('Image uploadée avec succès:', response);
            submitStudent(response.filePath || '');
          },
          error: (error) => {
            console.error('Erreur lors de l\'upload de l\'image:', error);
            this.isLoading = false;
            this.showErrorMessage('Erreur lors de l\'envoi de la photo');
          }
        });
      } else {
        submitStudent('');
      }

    } else {
      this.markFormGroupTouched(this.studentForm);
      this.showErrorMessage('Veuillez remplir tous les champs requis correctement.');
    }
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  resetForm(): void {
    this.studentForm.reset();
    this.selectedFile = null;
    this.previewUrl = null;
    this.uploadError = null;
    
    // Réinitialiser l'input file
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  showSuccessMessage(): void {
    alert('Étudiant ajouté avec succès !');
  }

  showErrorMessage(message: string): void {
    alert('Erreur: ' + message);
  }

  // Getters pour faciliter l'accès aux contrôles dans le template
  get name() { return this.studentForm.get('name'); }
  get surname() { return this.studentForm.get('surname'); }
  get date_naiss() { return this.studentForm.get('date_naiss'); }
  get lieu_naiss() { return this.studentForm.get('lieu_naiss'); }
  get sexe() { return this.studentForm.get('sexe'); }
  get tel() { return this.studentForm.get('tel'); }
  get adress_edt() { return this.studentForm.get('adress_edt'); }
  get matricule() { return this.studentForm.get('matricule'); }
  get father() { return this.studentForm.get('father'); }
  get mother() { return this.studentForm.get('mother'); }
  get tel_parent() { return this.studentForm.get('tel_parent'); }
  get adresse_parent() { return this.studentForm.get('adresse_parent'); }
  get tuteur() { return this.studentForm.get('tuteur'); }
  get tel_titeur() { return this.studentForm.get('tel_titeur'); }
  get adress_titeur() { return this.studentForm.get('adress_titeur'); }
  get ecole_anter() { return this.studentForm.get('ecole_anter'); }
  get password() { return this.studentForm.get('password'); }
  get image() { return this.studentForm.get('image'); }
}
