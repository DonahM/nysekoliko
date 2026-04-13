import { environment } from '../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { decodeId } from '../../../shared/utils/crypto.utils';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-emploi-du-temps-client',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatIconModule,
    MatTabsModule
  ],
  templateUrl: './emploi-du-temps-client.component.html',
  styleUrls: ['./emploi-du-temps-client.component.css']
})
export class EmploiDuTempsClientComponent implements OnInit {
  baseUrl = environment.baseUrl;
  studentId: number | null = null;
  idCls: number | null = null;
  idSchool: number | null = null;
  className: string = '';
  yearName: string = '';
  
  academicHistory: { yearName: string, className: string, idSchool: number, idCls: number }[] = [];
  scheduleMap: { [key: string]: any[] } = {};
  
  scheduleItems: any[] = [];
  daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  isLoading = false;
  errorMessage = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    // Le routing pour ClientComponent est typiquement /front-office/client/:idEdt/emploi-du-temps
    // on l'extrait depuis les paramètres de l'url parent ou courant
    let encodedId = this.route.snapshot.paramMap.get('idEdt');
    if (!encodedId && this.route.parent) {
      encodedId = this.route.parent.snapshot.paramMap.get('idEdt');
    }

    if (encodedId) {
      const decodedStr = decodeId(encodedId);
      this.studentId = decodedStr ? Number(decodedStr) : null;
      if (this.studentId) {
        this.fetchStudentData(this.studentId);
      } else {
        this.errorMessage = 'ID étudiant invalide.';
      }
    } else {
      this.errorMessage = "ID étudiant introuvable dans l'URL.";
    }
  }

  fetchStudentData(idEdt: number): void {
    this.isLoading = true;
    this.http.get(`${environment.apiUrl}/etudiants/id/${idEdt}`).subscribe({
      next: (data: any) => {
        if (Array.isArray(data) && data.length > 0) {
          const student = data[0];
          const studentClasses = student.classE || [];

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
              
              // Sort descending (latest year first)
              this.academicHistory.sort((a, b) => b.idSchool - a.idSchool);
              
              if (this.academicHistory.length > 0) {
                // Fetch schedule for all historical years parallelly
                this.academicHistory.forEach(hist => {
                  if (hist.idCls && hist.idSchool) {
                    this.fetchScheduleForHistory(hist);
                  }
                });
              } else {
                this.isLoading = false;
              }
            });
          });

        } else {
          this.errorMessage = 'Étudiant introuvable.';
          this.isLoading = false;
        }
      },
      error: (err) => {
        this.errorMessage = "Erreur lors du chargement des informations de l'étudiant.";
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  fetchClassName(): void {
    // Deprecated for direct use, handled in academicHistory mapping
  }

  fetchYearName(): void {
    // Deprecated for direct use, handled in academicHistory mapping
  }

  fetchScheduleForHistory(hist: any): void {
    const url = `${environment.apiUrl}/emploi-du-temps/classe/${hist.idCls}/year/${hist.idSchool}`;
    this.http.get<any[]>(url).subscribe({
      next: (res) => {
        this.scheduleMap[`${hist.idSchool}-${hist.idCls}`] = res || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error(`Erreur chargement EDT ${hist.yearName}`, err);
        this.isLoading = false;
      }
    });
  }

  fetchSchedule(): void {
    // Deprecated for direct use
  }

  getSlotsForDay(day: string, hist: any): any[] {
    const items = this.scheduleMap[`${hist.idSchool}-${hist.idCls}`] || [];
    return items.filter(item => item.jour.toLowerCase() === day.toLowerCase());
  }



}
