import { Component } from '@angular/core';
import { Data, Router, RouterModule, RouterOutlet } from '@angular/router';
import { fader } from './route-animations';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LoginRequest } from './loginRequest';

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


  constructor(private fb: FormBuilder, private router:Router, private loginService: AuthService) {
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
  if (this.loginForm.valid){
    //conectar al backend
    console.log(this.loginForm.value)
    alert('Bien, pudiste ingresar ') //no se porque este no anda verificar luego 
  } else{
    //mensaje de  error
    console.log('Formulario invalido');
    alert('Lo siento, verifica que los datos sean correctos')// este lo mismo
  }
}

  onLogin(event:Event){
     if (this.loginForm.valid){
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (response) => {
          console.log('login exitoso', response)
          //dirigir al usuario a la pagina de los productos
          this.router.navigateByUrl('/productos');
        },
        error: (error) => {
          alert('error en el login');
        },
        complete: () => {
          console.info('login completo');
        },
      });
      this.loginForm.reset();
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


