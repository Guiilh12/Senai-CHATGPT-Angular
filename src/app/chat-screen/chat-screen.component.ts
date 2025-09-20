import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
 
interface Ichat{
  chatTitle:string;
  id:string;
  userId:string;
}
interface Imensagens{
chatId: number;
id:number;
text:string;
userId:string

}


@Component({
  selector: 'app-chat-screen',
  imports: [ CommonModule,ReactiveFormsModule ],
  templateUrl: './chat-screen.component.html',
  styleUrl: './chat-screen.component.css'
})
export class ChatScreenComponent {
  chats: Ichat[];
  mensagemUsuario = new FormControl("");

chatSelecionado: Ichat;
mensagens :Imensagens[];

  constructor(private http:HttpClient,private cd: ChangeDetectorRef) { 

    this.chats = [];
    this.chatSelecionado = null!;
    this.mensagens = [];

   } 
   
   
   
   //requisecao
ngOnInit (){  //executa quando o angular esta pronto pra rodar.
//Buscar dados da API

this.getChats();

}

 async getChats(){
  // metedo de buscar  os  chats da API
//   let response = await this.http.get("https://senai-gpt-api.azurewebsites.net/chats",
//      {headers:{
//     "Authorization": "Bearer "+ localStorage.getItem("meuToken")
//   }
  // }).toPromise()
   let response = await firstValueFrom (this.http.get ("https://senai-gpt-api.azurewebsites.net/chats",{
    headers:{ 
      "Authorization" : 'Bearer ' + localStorage.getItem("meuToken")
    }
  })) as Ichat[];


if (response){
  console.log("CHATS", response);

let userId = localStorage.getItem("meuId");

  response = response.filter(chat => chat.userId == userId)
this.chats = response as [];
}else{
console.log("Erro ao buscar os chats.")
}

}
//atualizar as mensagems na tela
async onChatClick (chatClicado:Ichat){{
  console.log("chat Clicado", chatClicado);

  this.chatSelecionado = chatClicado
  let response = await firstValueFrom (this.http.get ("https://senai-gpt-api.azurewebsites.net/messages?chatId=" + 
    chatClicado.id,{
    headers:{ 
      "Authorization" : 'Bearer ' + localStorage.getItem("meuToken")
    }
  }));
  
  console.log("MENSAGENS", response)

  this.mensagens = response as Imensagens[];
  this.cd.detectChanges();
}

}

async enviarMensagem(){

  let novaMensagemUsuario = {
    //id
    chatId:this.chatSelecionado.id,
    
    userId:localStorage.getItem("meuId"),
    text: this.mensagemUsuario.value
  };

  let novaMensagemUsuarioResponse= await firstValueFrom(this.http.post("https://senai-gpt-api.azurewebsites.net/messages", novaMensagemUsuario, {
    headers:{ 
      "content-type" : "application/json",
      "Authorization" : "Bearer " + localStorage.getItem("meuToken")
    }
  }));
  //atualizar as mensagems na tela
 await this.onChatClick(this.chatSelecionado)

 // 2- - Enviar a mensagem do usuario para a IA responder.
 let respostaIAResponse = await firstValueFrom(this.http.post(
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",{
    "contents" :[
      {
        "parts":[
          {
            "text" : this.mensagemUsuario.value + ". Me de uma resposta objetiva"
          }
        ]
      }
    ] 
  },{
    headers:{

    "Content-Type": "appllication/json",

    "x-goog-api-key": "AIzaSyDV2HECQZLpWJrqCKEbuq7TT5QPKKdLOdo"}

  })) as any;
  let novaRespostaIA = {
    chatId: this.chatSelecionado.id,
    userId: "chatbot",
    text:respostaIAResponse.candidates[0].content.parts[0].text
  }

//3 - salva a respota da ia no banco de dados

  let novaMensagemIAResponse= await firstValueFrom(this.http.post(
    "https://senai-gpt-api.azurewebsites.net/messages", novaRespostaIA, {

    headers:{ 

      "content-type" : "application/json",

      "Authorization" : "Bearer " + localStorage.getItem("meuToken")

    }

  }));

  //atualizar as mensagems na tela

  await this.onChatClick(this.chatSelecionado)

}

async novoChat(){
const nomeChat = prompt("Digite o nome do novo chat:");
if(!nomeChat){
  alert("nome invalido")
    return;
  
}
    const novoChatObj = {
      chatTitle: nomeChat,
      userId: localStorage.getItem("meuId")
    }
    let novoChatresponse = await firstValueFrom (this.http.post ("https://senai-gpt-api.azurewebsites.net/chats", 
      novoChatObj,{
      headers:{ 

        "content-type" : "application/json",

        "Authorization" : 'Bearer ' + localStorage.getItem("meuToken")

      }
    })) as Ichat;
//atualiza os chats da tela
    await this.getChats();
 await this.onChatClick(novoChatresponse);
}
deslogar(){
  //1 alternativa
  localStorage.removeItem("meuToken");
  localStorage.removeItem("meuId");

  localStorage.clear();
  window.location.href = "LOgin";
}
}
