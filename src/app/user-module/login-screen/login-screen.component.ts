import { Token } from '@angular/compiler';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-screen',
  imports: [ReactiveFormsModule],
  templateUrl: './login-screen.component.html',
  styleUrl: './login-screen.component.css'
})
export class LoginScreenComponent {
loginForm: FormGroup; 

emailErrorMessage:string;

senhaErrorMessage1:string;

loginComSucesso:string;

loginComFalha:string


 //qundo a tela iniciar.//

constructor(private fb: FormBuilder, private cd:ChangeDetectorRef){
   //qundo a tela iniciar.//


//iniciar furmulario 
//criar o campo obrigatorio de email
//criar o campo obrigatorio de senha
  this.loginForm = this.fb.group({
    email:["", [Validators.required]],
    password:["", [Validators.required]]
  })
  //inicia co uma string vazia
  this.emailErrorMessage ="";

  this.senhaErrorMessage1 ="",

  this.loginComSucesso ="",

  this.loginComFalha =""
}
 async onLoginclik(){
  // alert("Botao de login clicado.");

  console.log("Email", this.loginForm.value.email);

  console.log("Password", this.loginForm.value.password);
  //method REST
  //POST criar
  // GET Buscar
  //PUT Atualizar
  //DELETE apagar
if (this.loginForm.value.email == ""){
  // alert("preencha o email")
  this.emailErrorMessage =" O campo de e-mail e obrigatorio.";
  return;
}
if (this.loginForm.value.password == ""){
  // alert("preencha o senha")
  this.senhaErrorMessage1 = "O campo de senha e obrigatorio"
  return;
}


  let response = await fetch("https://senai-gpt-api.azurewebsites.net/login", {
    method:"POSt",
    headers: {
      "Content-Type" : "application/json"
    },
    body:JSON.stringify({
    email: this.loginForm.value.email,
    password: this.loginForm.value.password
    })
  });

  
  
if(response.status ==200 && response.status <=299){
//alert("acesso permitido")
this.loginComSucesso ="Login efetuado com sucesso!"
let json = await response.json();
console.log("JSON", json)
let meutoken = json.accessToken;
let userld =json.user.id;

localStorage.setItem ("meutoken", meutoken);
localStorage.setItem("userld", userld);
window.location.href = "chat";

} else {
//  alert("Email ou Senha errada!")
this.loginComFalha ="credenciais incorretas! "

}
 }
}

