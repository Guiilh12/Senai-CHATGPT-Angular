import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
 
interface Ichat{
  chatTitle:string;
  id:string;
  userId:string;
}
@Component({
  selector: 'app-chat-screen',
  imports: [HttpClientModule, CommonModule ],
  templateUrl: './chat-screen.component.html',
  styleUrl: './chat-screen.component.css'
})
export class ChatScreenComponent {
  chats: Ichat[];


  constructor(private http:HttpClient) { 
    this.chats = [];
   } //requisecao

ngOnInit (){  //executa quando o angular esta pronto pra rodar.
//Buscar dados da API

this.getChats();

}

async getChats(){
  // metedo de buscar  os  chats da API
  let response = await this.http.get("https://senai-gpt-api.azurewebsites.net/chats",
     {headers:{
    "Authorization": "Bearer "+ localStorage.getItem("meuToken")
  }
}).toPromise();

if (response){
this.chats = response as [];
}else{
console.log("Erro ao buscar os chats.")
}
}
}
