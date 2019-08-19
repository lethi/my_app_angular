import { Injectable } from '@angular/core';

//definir class MessageService
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  //Attributs
  messages : string[] = [];

  addMesage(msg: string){
    this.messages.push(msg);
  }

  clearAllMessages(){
    this.messages = [];
  }
}
