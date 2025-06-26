import { Component, OnInit } from '@angular/core';
import { Administrador, AdminManagerService } from '../../services/admin-manager.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-manager',
  standalone:true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-manager.html',
  styleUrl: './admin-manager.css'
})
export class AdminManager implements OnInit{
    administradores: Administrador[] = [];

    nuevoAdmin = {
    nombre: '',
    apellido: '',
    usuario: '',
    email: '',
    password: '',
};

  constructor(private adminManagerService: AdminManagerService) {}

  ngOnInit(): void {
    this.cargarAdministradores();
  }

  cargarAdministradores(): void {
    this.adminManagerService.listarAdministradores().subscribe({
      next: (admins) => this.administradores = admins,
      error: (err) => console.error('Error al cargar administradores:', err)
    });
  }

  crearAdministrador() {
  const datosParaEnviar = {
    ...this.nuevoAdmin,
    contraseña: this.nuevoAdmin.password
  };

  this.adminManagerService.crearAdministrador(datosParaEnviar).subscribe({
  next: () => {
    Swal.fire({
      icon: 'success',
      title: 'Administrador creado',
      text: 'Administrador creado correctamente',
      confirmButtonText: 'OK'
    });
    this.nuevoAdmin = { nombre: '', apellido: '', usuario: '', email: '', password: '' };
  },
  error: () => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Error al crear el administrador',
      confirmButtonText: 'Intentar de nuevo'
    });
  }
});
}
}
