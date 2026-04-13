import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userData = localStorage.getItem('userData');
  
  if (userData) {
    // Si l'utilisateur est déjà connecté, il ne peut plus visiter la page de login
    router.navigate(['/back-office']);
    return false;
  }
  
  // Non authentifié on le laisse accéder à la page de login
  return true;
};
