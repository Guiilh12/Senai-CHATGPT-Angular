import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-user-screen',
  imports: [ReactiveFormsModule],
  templateUrl: './new-user-screen.component.html',
  styleUrl: './new-user-screen.component.css'
})
export class NewUserScreenComponent{
  cadastroForm: FormGroup;

 insiraNome:string;

insiraEmail:string;

insiraSenha:string;

senhaEfetuada:string;

cadastrComsucesso:string;

cadastroComFalha :string;

  constructor(private fb: FormBuilder, private cd:ChangeDetectorRef){

    this.cadastroForm = this.fb.group({

      nome: ["",[ Validators.required]],
      email:["", [Validators.required]],
      senha:["", [Validators.required, Validators.minLength(6),]],
      comfirmacao:["", [Validators.required]]
    })
  
    this.insiraNome ="",
  
    this.insiraEmail ="",
  
    this.insiraSenha ="",

    this.senhaEfetuada ="",
    
    this.cadastrComsucesso =""

    this.cadastroComFalha = ""
  
  }
async onLoginclik(){
  const token = localStorage.getItem("meuToken");

  // console.log("Nome", this.cadastroForm.value.Nome);

  // console.log("Email", this.cadastroForm.value.Email);

  // console.log("senha", this.cadastroForm.value.Senha);

  // console.log("comfirmacao", this.senhaEfetuada.value.comfirmacao);
  
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

if(this.cadastroForm.value.senha == ""){
  this.insiraSenha ="Insira a senha"
return;
}
if(this.cadastroForm.value.comfirmacao== ""){
  this.senhaEfetuada ="Comfirme a senha"
  return;

 
}

let response = await fetch("https://senai-gpt-api.azurewebsites.net/users", {
  method:"POST",
  headers: {
    "Content-Type" : "application/json",
    "authorization" : `Bearer ${token}`
  },
  body:JSON.stringify({
  name:this.cadastroForm.value.nome,

  email:this.cadastroForm.value.email,

  password: this.cadastroForm.value.senha,

  })
});


if(this.cadastroForm.value.senha == this.cadastroForm.value.confirmacao){
  this.senhaEfetuada ="Senha comfirmada"
} else {
//  alert("Email ou Senha errada!")
this.cadastroForm.value.comfirmacao=" cadastro não efetuado"
}
}
}