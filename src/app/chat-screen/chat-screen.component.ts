import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
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
  imports: [ CommonModule ],
  templateUrl: './chat-screen.component.html',
  styleUrl: './chat-screen.component.css'
})
export class ChatScreenComponent {
  chats: Ichat[];


chatSelecionado: Ichat;
mensagens :Imensagens[];

  constructor(private http:HttpClient) { 
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
  }));


if (response){
this.chats = response as [];
}else{
console.log("Erro ao buscar os chats.")
}

}
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
}

}
}
