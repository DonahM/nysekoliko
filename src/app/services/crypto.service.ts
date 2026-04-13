import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }

  encryptParam(id: string | number | null | undefined): string {
    if (id === null || id === undefined) {
      return '';
    }
    // Simple Base64 encoding for obfuscation
    return btoa(id.toString());
  }

  decryptParam(hash: string | null): string {
    if (!hash) {
      return '';
    }
    try {
      // Decode Base64 back to string representation of ID
      return atob(hash);
    } catch (e) {
      console.error('Erreur lors du décryptage du paramètre de route', e);
      return '';
    }
  }
}
