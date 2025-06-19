import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  templateUrl: './auth.html',
  imports: [RouterModule, ReactiveFormsModule, FormsModule, CommonModule],
  styleUrls: ['./auth.css']
})
export class AuthComponent {
  showLogin = true;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private loginService: AuthService) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      contraseña: ['', Validators.required],
    });
  }

  toggle(): void {
    this.showLogin = !this.showLogin;
  }

  get Password() {
    return this.loginForm.get('contraseña');
  }

  get Username() {
    return this.loginForm.get('usuario');
  }

  onEnviar(event: Event) {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      alert('Bien, pudiste ingresar');
    } else {
      console.log('Formulario inválido');
      alert('Lo siento, verifica que los datos sean correctos');
    }
  }

  onLogin(event: Event) {
    event.preventDefault();
    const { usuario, contraseña } = this.loginForm.value;

    this.loginService.login(usuario, contraseña).subscribe({
      next: (respuesta) => {
        console.log(respuesta);
        if (respuesta.access_token) {
          localStorage.setItem('access_token', respuesta.access_token);
          localStorage.setItem('usuario', JSON.stringify(respuesta));
          localStorage.setItem( 'rol', respuesta.rol);
          alert('Bien, pudiste ingresar');
          this.router.navigate(['/productos']);
        } else {
          alert('Contraseña incorrecta');
        }
      },
      error: (error) => {
        console.error('Error en login:', error);
        alert('Usuario no encontrado o error en el servidor');
      },
      complete: () => {
        console.info('Login completo');
        this.loginForm.reset();
      }
    });
  }

  goToRegister(): void {
    this.router.navigate(['/auth/registro']);
  }
}


