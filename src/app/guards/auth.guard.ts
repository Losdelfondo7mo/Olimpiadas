import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Verifica si el usuario está autenticado
    const token = localStorage.getItem('access_token');
    if (token) {
      return true;
    }
    
    // Si no está autenticado, redirige al login
    this.router.navigate(['/auth']);
    return false;
  }
}