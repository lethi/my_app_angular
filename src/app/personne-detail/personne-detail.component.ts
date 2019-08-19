import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Personne} from '../personne';
import {PersonneService} from '../personne.service'

@Component({
  selector: 'app-personne-detail',
  templateUrl: './personne-detail.component.html',
  styleUrls: ['./personne-detail.component.css']
})
export class PersonneDetailComponent implements OnInit {

  //@Input() personne : Personne;
  personne : Personne;

  constructor(private route: ActivatedRoute, 
        private personneService : PersonneService, 
        private location: Location) { }

  ngOnInit() {
    this.getPersonne();
  }
 
  getPersonne():void{
    /**Route parameters are always strings. 
     * The JavaScript (+) operator converts the string to a number */
    const id = +this.route.snapshot.paramMap.get('id');
    /*subscribe recoit le resultat puis le convertir en type "normal" et affecter à 'this.personne'*/
    this.personneService.getPersonneById(id).subscribe(pers => this.personne = pers);
  }

  save(): void{
    this.personneService.updatePersonne(this.personne).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
