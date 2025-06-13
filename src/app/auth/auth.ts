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


  constructor(private fb: FormBuilder, private router:Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
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

 get Username() {
  return this.loginForm.get('username');
}

onEnviar(event:Event){
  if (this.loginForm.valid)
  {
    //conectar al backend
    console.log(this.loginForm.value)
    alert('Bien, pudiste ingresar ') //no se porque este no anda verificar luego 
  }
  else
  {
    //mensaje de  error
    console.log('Formulario invalido');
    alert('Lo siento, verifica que los datos sean correctos')// este lo mismo
  }
}

  onLogin(event:Event){
     if (this.loginForm.valid)
  {
    //conectar al backend
    console.log(this.loginForm.value);
    alert('Bien, pudiste ingresar ')
  }
  else
  {
    //mensaje de  error
    console.log('Formulario invalido');
    alert('Lo siento, verifica que los datos sean correctos')
  }
  }

  goToRegister(): void {
    this.router.navigate(['/auth/registro']);
    }
}


