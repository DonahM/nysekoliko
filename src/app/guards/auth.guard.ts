import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userData = localStorage.getItem('userData');
  
  if (userData) {
    return true; // Autentifié : on laisse passer
  }
  
  // Non authentifié : on redirige vers l'accueil (ou form-admin)
  router.navigate(['/front-office/form-admin']);
  return false;
};
