import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})


export class Registro  {
  showRegister = true

  registerForm: FormGroup;

 
  constructor(private fb: FormBuilder, private router:Router) {
      this.registerForm = this.fb.group({
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        usuario: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
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

  get ConfirmPassword() {
    return this.registerForm.get('confirmPassword')
  }

  onRegister(event:Event) {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;

    if (this.registerForm.valid && password === confirmPassword) {
      console.log('Registro exitoso', this.registerForm.value);
      alert('Exclente, creaste tu usuario')
    } else{
      console.log('Tiene un error', this.registerForm.value);
      alert('Las contraseñas no coinciden o hay errores en el formulario');
      this.registerForm.markAllAsTouched();
    }
  }

  backToLogin(): void {
    this.router.navigate(['/auth']);
  }

}
