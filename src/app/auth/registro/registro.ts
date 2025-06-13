import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  get Nombre() {
   return this.registerForm.get('nombre');
}

  get Apellido() {
   return this.registerForm.get('apellido');
}

  get Email() {
   return this.registerForm.get('email');
}

get Usuario(){
  return this.registerForm.get('usuario');
}

  get Password() {
   return this.registerForm.get('password');
}

  onRegister(event:Event) {
    if (this.registerForm.valid) {
      console.log('Registro exitoso', this.registerForm.value);
      // lógica real de registro...
    }
    else{
      console.log('Registro exitoso', this.registerForm.value)
    }
  }

  backToLogin(): void {
    this.router.navigate(['/auth']);
  }

}
