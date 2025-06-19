import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.estaAutenticado() && this.auth.getRol() === 'administrador') {
      return true;
    }

    // si no es admin nos redirige a un error
    this.router.navigate(['/']);
    return false;
  }
}
