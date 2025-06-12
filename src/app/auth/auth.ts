import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { fader } from './route-animations';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  templateUrl: './auth.html',
  imports:[RouterModule, ReactiveFormsModule, FormsModule],
  animations: [fader],
  styleUrls: ['./auth.css']
})
export class AuthComponent {
  showLogin = true;

  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router:Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  toggle(): void {
    this.showLogin = !this.showLogin;
  }
  //nuevo//
  get Password(){
    return this.loginForm.get ('password');
}

  get Email(){
    return this.loginForm.get('email');
}
onEnviar(event:Event){
  if (this.loginForm.valid)
  {
    //conectar al backend
    console.log(this.loginForm.value)
  }
  else
  {
    //mensaje de  error
    console.log('Formulario invalido');
  }
}

  onLogin(event:Event){
     if (this.loginForm.valid)
  {
    //conectar al backend
    console.log(this.loginForm.value)
  }
  else
  {
    //mensaje de  error
    console.log('Formulario invalido');
  }
  }

  goToRegister(): void {
    this.router.navigate(['/auth/registro']);
    }
}


