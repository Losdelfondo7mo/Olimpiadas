import { Component } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup ,ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  form : FormGroup;
  constructor(private formBuilder: FormBuilder){

    this.form = this.formBuilder.group(
      {
        email:['', [Validators.required, Validators.email]],
        password:['', Validators.required]
      }
    )
  }

get Password(){
    return this.form.get ('password');
}

get Email(){
    return this.form.get('email');
}


onEnviar(event:Event){
  if (this.form.valid)
  {
    //conectar al backend
    console.log(this.form.value)
  }
  else
  {
    //mensaje de  error
    console.log('Formulario invalido');
  }
}


}
