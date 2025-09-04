import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-screen',
  imports: [ReactiveFormsModule],
  templateUrl: './login-screen.component.html',
  styleUrl: './login-screen.component.css'
})
export class LoginScreenComponent {

loginform:FormGroup; 

 //qundo a tela iniciar.//

constructor(private fb: FormBuilder){
//iniciar furmulario 
//criar o campo obrigatorio de email
//criar o campo obrigatorio de senha
  this.loginform = this.fb.group({
    email:["", [Validators.required]],
    password:["", [Validators.required]]
  })
}
onLoginclik(){
  alert("Botao de login clicado.");

  console.log("Email", this.loginform.value.email)
  console.log("Password", this.loginform.value.password)
}
 }
