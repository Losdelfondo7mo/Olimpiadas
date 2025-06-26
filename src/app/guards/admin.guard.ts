import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Verifica si el usuario es administrador
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    if (usuario && usuario.es_admin) {
      return true;
    }
    
    // Si no es administrador, redirige a la página principal
    this.router.navigate(['/productos']);
    return false;
  }
}