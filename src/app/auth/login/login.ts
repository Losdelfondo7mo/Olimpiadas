import { Component } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup ,ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports:[ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  form : FormGroup;
  constructor(private formBuilder: FormBuilder){

    this.form = this.formBuilder.group(
      {
        email:['', Validators.required],
        password:[]
      }
    )
  }
  onEnviar(event:Event)
{
console.log(this.form.value)
}


}
