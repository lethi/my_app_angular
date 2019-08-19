import { Component, OnInit } from '@angular/core';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  /**parameter messageService doit être public pr le lier à HTML*/
  constructor(public msgService : MessageService) { }

  ngOnInit() {
  }

}
