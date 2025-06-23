import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-perfil',
  imports: [RouterModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class Perfil {

    nombre: string | null = '';
    apellido: string | null = '';
    email: string | null = '';
    usuario: string | null = '';

  constructor(private authService: AuthService, private router: Router) {}

   ngOnInit(): void {
    const usuarioString = localStorage.getItem('usuario');
    if (usuarioString) {
      const usuarioObj = JSON.parse(usuarioString);
      this.nombre = usuarioObj.nombre || '';
      this.apellido = usuarioObj.apellido || '';
      this.email = usuarioObj.email || '';
      this.usuario = usuarioObj.usuario || '';
    } else {
      this.nombre = '';
      this.apellido = '';
      this.email = '';
      this.usuario = '';
    }
  }

  logout(): void {
    this.authService.cerrarSesion();
    this.router.navigate(['/auth']);
  }
}

