import { Routes } from '@angular/router';
import { ClassComponent } from './back-office/class/class.component';
import { EtudiantComponent } from './back-office/etudiant/etudiant.component';
import { AddFormComponent } from './back-office/add-form/add-form.component';
import { AddFormEtudiantComponent } from './back-office/add-form-etudiant/add-form-etudiant.component';
import { ProfComponent } from './back-office/prof/prof.component';
import { ProfilEtudiantComponent } from './back-office/profil-etudiant/profil-etudiant.component';
import { ListeEtClsComponent } from './back-office/liste-et-cls/liste-et-cls.component';
import { AddFormProfComponent } from './back-office/add-form-prof/add-form-prof.component';
import { ProfileProComponent } from './back-office/profile-pro/profile-pro.component';
import { BackOfficeComponent } from './back-office/back-office.component';
import { FrontOfficeComponent } from './front-office/front-office.component';
import { AccueilComponent } from './front-office/accueil/accueil.component';
import { FormAdminComponent } from './front-office/form-admin/form-admin.component';
import { FormClientComponent } from './front-office/form-client/form-client.component';
import { ClientComponent } from './front-office/client/client.component';
import { ProfilComponent } from './front-office/client/profil/profil.component';
import { EcolageComponent } from './front-office/client/ecolage/ecolage.component';
import { NoteComponent } from './front-office/client/note/note.component';
import { MatiereComponent } from './back-office/matiere/matiere.component';
import { AddSemestreComponent } from './back-office/add-semestre/add-semestre.component';
import { AddSalaireComponent } from './back-office/add-salaire/add-salaire.component';
import { TablematiereComponent } from './back-office/tablematiere/tablematiere.component';
import { TableSemestreComponent } from './back-office/table-semestre/table-semestre.component';
import { TableNoteComponent } from './back-office/table-note/table-note.component';
import { TableSalaireComponent } from './back-office/table-salaire/table-salaire.component';
import { NotesclasseetudiantComponent } from './back-office/notesclasseetudiant/notesclasseetudiant.component';
import { EcoleComponent } from './back-office/ecole/ecole.component';
import { AddUserComponent } from './back-office/add-user/add-user.component';
import { SemestreComponent } from './front-office/client/semestre/semestre.component';
import { EmploiDuTempsClientComponent } from './front-office/client/emploi-du-temps-client/emploi-du-temps-client.component';
import { EmploiDuTempsComponent } from './back-office/emploi-du-temps/emploi-du-temps.component';
import { PresenceProfComponent } from './back-office/presence-prof/presence-prof.component';
import { authGuard } from './guards/auth.guard';
import { isLoggedInGuard } from './guards/is-logged-in.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'front-office', pathMatch: 'full' },

    { 
        path: 'front-office',
        component: FrontOfficeComponent, 
        children: 
        [
            { path: '', redirectTo: 'accueil', pathMatch: 'full' },
            { path: 'accueil', component: AccueilComponent },
            { 
                path: 'actualites', 
                loadComponent: () => import('./front-office/actualites-page/actualites-page.component').then(m => m.ActualitesPageComponent) 
            },
            { path: 'form-admin', component: FormAdminComponent, canActivate: [isLoggedInGuard] },
            { path: 'form-client', component: FormClientComponent },
            { path: 'client/:idEdt', component: ClientComponent, 
                children: [
                    { path: '', redirectTo: 'profil', pathMatch: 'full' },
                    { path:'profil', component: ProfilComponent},
                    { path:'ecolage', component: EcolageComponent},
                    { path:'note', component: NoteComponent},
                    { path: 'semestre', component: SemestreComponent }, // Ajout de la route pour semestre
                    { path: 'emploi-du-temps', component: EmploiDuTempsClientComponent }
                ]
             },
        ]
    },
    
    // Back-office routes
    { 
        path: 'back-office',
        component: BackOfficeComponent, 
        canActivate: [authGuard],
        children: 
        [
            { path: '', redirectTo: 'etudiant', pathMatch: 'full' },  // Route par défaut
            { path: 'etudiant', component: EtudiantComponent },
            { path: 'etudiant/addEtudiant', component: AddFormEtudiantComponent },
            { path: 'etudiant/profilEtudiant/:idEdt', component: ProfilEtudiantComponent },
            { path: 'class', component: ClassComponent },
            { path: 'class/addClass', component: AddFormComponent },
            { path: 'class/listEtClass/:idCls', component: ListeEtClsComponent },
            { path: 'prof', component: ProfComponent },
            { path: 'prof/profile/:idProf', component: ProfileProComponent },
            { path: 'prof/add-form-prof', component: AddFormProfComponent },
            { path: 'tablematiere', component: TablematiereComponent },
            { path: 'matiere', component: MatiereComponent },
            { path: 'tablesemestre', component: TableSemestreComponent },
            { path: 'semestre', component: AddSemestreComponent },
            { path: 'tablenote', component: TableNoteComponent },
            { path: 'tablenote/tablenoteclasse/:idCls', component: NotesclasseetudiantComponent },
            { path: 'tablesalaire', component: TableSalaireComponent },
            { path: 'salaire', component: AddSalaireComponent },
            { path: 'ecole', component: EcoleComponent },
            { path: 'ecole/add-user', component: AddUserComponent },
            { path: 'emploi-du-temps', component: EmploiDuTempsComponent },
            { path: 'presence-prof', component: PresenceProfComponent },
            { 
                path: 'actualites', 
                loadComponent: () => import('./back-office/actualites/actualites.component').then(m => m.ActualitesComponent) 
            },
            { 
                path: 'finances', 
                loadComponent: () => import('./back-office/finances/finances.component').then(m => m.FinancesComponent) 
            },
            { 
                path: 'depenses', 
                loadComponent: () => import('./back-office/depenses/depenses.component').then(m => m.DepensesComponent) 
            },
        ]
    },
    
];
