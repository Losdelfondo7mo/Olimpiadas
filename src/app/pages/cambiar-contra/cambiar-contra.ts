import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cambiar-contra',
  imports: [CommonModule, FormsModule],
  templateUrl: './cambiar-contra.html',
  styleUrl: './cambiar-contra.css'
})
export class CambiarContra {
  formData = {
    passwordActual: '',
    passwordNueva: '',
    confirmarPassword: ''
};


  constructor(private http: HttpClient) {}

  cambiarContrasena() {
    const usuario_id = JSON.parse(localStorage.getItem('usuario') || '{}').id;
    const url = `/api/usuarios/${usuario_id}/cambiar-contraseña`;

    this.http.put(url, this.formData).subscribe({
      next: res => {
        alert('Contraseña actualizada con éxito.');
      },
      error: err => {
        alert('Error al cambiar contraseña.');
        console.error(err);
      }
    });
  }
}