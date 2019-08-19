import { Component, OnInit } from '@angular/core';
import {Personne} from '../personne';
import {PersonneService} from '../personne.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  personnesArray: Personne[] = [];

  constructor(private persService: PersonneService) { }

  ngOnInit() {
    this.getPersonnes();
  }

  getPersonnes(): void{
    this.persService.getPersonnes()
        .subscribe(personnes => this.personnesArray=personnes.slice(0 ,50));
  }

}
