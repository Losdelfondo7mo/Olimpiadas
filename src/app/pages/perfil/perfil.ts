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
    this.nombre = localStorage.getItem('nombre');
    this.apellido = localStorage.getItem('apellido');
    this.email = localStorage.getItem('email');
    this.usuario = this.authService.usuarioActual;
  }

  logout(): void {
    this.authService.cerrarSesion();
    this.router.navigate(['/auth']);
  }
}

