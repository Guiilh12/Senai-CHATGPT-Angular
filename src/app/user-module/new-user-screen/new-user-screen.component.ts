import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-user-screen',
  imports: [],
  templateUrl: './new-user-screen.component.html',
  styleUrl: './new-user-screen.component.css'
})
export class NewUserScreenComponent{
  cadastroForm: FormGroup;

 insiraNome:string;

insiraEmail:string;

insiraSenha:string;

cadastrComsucesso:string;

cadastroComFalha :string;

  constructor(private fb: FormBuilder, private cd:ChangeDetectorRef){

    this.cadastroForm = this.fb.group({

      nome: ["",[ Validators.required]],
      email:["", [Validators.required]],
      Senha:["", [Validators.required]]
    })
  
    this.insiraNome ="",
  
    this.insiraEmail ="",
  
    this.insiraSenha ="",
    
    this.cadastrComsucesso =""

    this.cadastroComFalha = ""
  
  }
async onLoginclik(){

  console.log("Nome", this.cadastroForm.value.Nome)
  console.log("Email", this.cadastroForm.value.Email);
  console.log("Password", this.cadastroForm.value.Senha);
  
if (this.cadastroForm.value.nome ==""){
  // alert("preencha o email")
 this.insiraNome="Insira nome"
  return;
}
if (this.cadastroForm.value.email == ""){
  // alert("preencha o senha")
  this.insiraEmail = " Insira  o email"
  return;
}

if(this.cadastroForm.value.senha == "")
  this.insiraSenha ="Insira a senha"

let response = await fetch("https://senai-gpt-api.azurewebsites.net/login", {
  method:"POSt",
  headers: {
    "Content-Type" : "application/json"
  },
  body:JSON.stringify({
    nome:this.cadastroForm.value.nome,
  email:this.cadastroForm.value.email,
  senha: this.cadastroForm.value.senha,
  })
});



if(response.status ==200 && response.status <=299){
//alert("acesso permitido")
this.cadastrComsucesso =" cadastro efetuado com sucesso!"
let json = await response.json();
console.log("JSON", json)
let meuToken = json.accessToken;
let userId =json.user.id;

localStorage.setItem ("meuToken", meuToken);
localStorage.setItem("userId", userId);
window.location.href = "chat";

} else {
//  alert("Email ou Senha errada!")
this.cadastroComFalha =" cadastro não efetuado"
}
}
}