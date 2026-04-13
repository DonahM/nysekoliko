import { environment } from '../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Route } from '@angular/router';  // Importez ActivatedRoute
import { decodeId, encodeId } from '../../shared/utils/crypto.utils';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';


@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    HttpClientModule, CommonModule, RouterModule, MatIconModule
  ,
  MatButtonModule, 
      MatCardModule, 
      CommonModule, 
      MatTableModule, 
      MatPaginatorModule, 
      MatSortModule, 
      MatDialogModule, 
      MatSelectModule, 
      MatOptionModule,
      HttpClientModule    
],
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  baseUrl = environment.baseUrl;
  client: any = null;  // Initialisez 'client' à null ou un objet vide.
  notificationDismissed: boolean = false;
  ecolageStatus: any = null;
  showNotificationPanel: boolean = false;
  unpaidMonths: any[] = [];
  className: string = '';
  yearName: string = '';
  
  // NOUVEAU : Historique complet
  academicHistory: { yearName: string, className: string, idSchool: number, idCls: number }[] = [];
  latestHistory: any = null;

  // Injectez ActivatedRoute pour accéder aux paramètres de la route
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const encodedId = this.route.snapshot.paramMap.get('idEdt'); // Utilisez 'route' pour accéder aux paramètres
    const idEdt = encodedId ? decodeId(encodedId) : null;
    console.log("ghfghghh: ", idEdt)
    if (idEdt) {
      this.http.get(`${environment.apiUrl}/etudiants/id/${idEdt}`).subscribe({
        next: (data: any) => {
          if (Array.isArray(data) && data.length > 0) {
            this.client = data[0]; 
            
            // Build Full History
            const studentClasses = this.client.classE || [];
            
            this.http.get<any[]>(environment.apiUrl + '/classes').subscribe(classes => {
              this.http.get<any>(environment.apiUrl + '/years-school').subscribe(yearsRes => {
                const years = Array.isArray(yearsRes?.data) ? yearsRes.data : (Array.isArray(yearsRes) ? yearsRes : []);
                
                this.academicHistory = studentClasses.map((sc: any) => {
                  const classInfo = classes.find(c => c.idCls === sc.idCls);
                  const yearInfo = classInfo ? years.find((y: any) => y.idSchool === classInfo.idSchool) : null;
                  
                  return {
                    idCls: sc.idCls,
                    idSchool: classInfo ? classInfo.idSchool : null,
                    className: classInfo ? classInfo.name : 'Inconnue',
                    yearName: yearInfo ? yearInfo.annee_scolaire : 'Année Inconnue'
                  };
                });
                
                // Sort to get latest (assuming higher idSchool is newer)
                this.academicHistory.sort((a, b) => b.idSchool - a.idSchool);
                
                if (this.academicHistory.length > 0) {
                  this.latestHistory = this.academicHistory[0];
                  this.className = this.latestHistory.className;
                  this.yearName = this.latestHistory.yearName;
                }
              });
            });
            
            console.log('Nom du client:', this.client.name); 
            this.checkEcolageStatus(); 
            this.loadUnpaidMonths(); // Charger les mois impayés
          } else {
            console.warn('Aucune donnée trouvée');
          }
        }
        
        // error: (err) => {
        //   console.error('Erreur lors de la récupération des données', err);
        // }
      });
    }
  }

  // Méthode pour obtenir le nombre de mois impayés
  getUnpaidMonthsCount(): number {
    return this.unpaidMonths.length;
  }

  // Méthode pour calculer le montant total impayé
  getTotalUnpaidAmount(): number {
    return this.unpaidMonths.reduce((total, month) => total + month.amount, 0);
  }

  loadUnpaidMonths(): void {
    if (!this.client) return;

    this.unpaidMonths = [];
    if (this.client.ecolages && Array.isArray(this.client.ecolages)) {
      this.client.ecolages.forEach((eco: any) => {
        const statut = (eco.statut || '').toLowerCase();
        // Check if the status is not paid
        if (statut !== 'payé' && statut !== 'paye' && statut !== 'payer') {
          this.unpaidMonths.push({
            monthName: eco.mois || 'Mois',
            year: eco.years_schools?.annee_scolaire || new Date().getFullYear(),
            amount: eco.valeur || 0,
            dueDate: eco.date
          });
        }
      });
    }
  }

  // Méthode pour basculer le panneau de notifications
  toggleNotificationPanel(): void {
    this.showNotificationPanel = !this.showNotificationPanel;
  }

  shouldShowEcolageNotification(): boolean {
    if (this.notificationDismissed || !this.client) {
      return false;
    }
    return this.unpaidMonths.length > 0;
  }

  checkEcolageStatus(): void {
    // Already checking status dynamically in loadUnpaidMonths
  }

  // Méthode pour masquer la notification
  dismissNotification(): void {
    this.notificationDismissed = true;
    
    // Optionnel: sauvegarder dans localStorage pour ne pas montrer la notification aujourd'hui
    const today = new Date().toDateString();
    localStorage.setItem(`notification-dismissed-${this.client?.idEdt}`, today);
  }

  // Méthode pour vérifier si la notification a déjà été masquée aujourd'hui
  isNotificationAlreadyDismissed(): boolean {
    const today = new Date().toDateString();
    const dismissedDate = localStorage.getItem(`notification-dismissed-${this.client?.idEdt}`);
    return dismissedDate === today;
  }

  encode(id: any): string {
    return encodeId(id);
  }
}
