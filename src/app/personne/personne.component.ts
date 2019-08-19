import { Component, OnInit } from '@angular/core';
import {Personne} from '../personne'
//import { PERSONNES } from '../mock-personnes';
import {PersonneService} from '../personne.service';

//definition du composant personne
@Component({
  selector: 'app-personne',
  templateUrl: './personne.component.html',
  styleUrls: ['./personne.component.css']
})
/*nom de composant personne/classe du composant personne*/
export class PersonneComponent implements OnInit {
  /* ---attributs--*/
  //personnes définis dans 'mock-personnnes.ts'
  listPersonnes : Personne[];
  personne : Personne;

  //Inject the PersonneService dans constructor
  constructor(private personneService : PersonneService) { }
  
  //Methodes :
  ngOnInit() {
    this.getPers();
  }
 
  onSelect(pers : Personne): void{
   // this.personne = pers;
  }

  // getPers(): void {
  //   this.listPersonnes = this.personneService.getPersonnes();
  // }
  /**Cette version affectait un tableau de pers à la propriété personnes du composant. 
   * L'affectation se fait de manière synchrone, comme si le serveur pouvait renvoyer des pers instantanément 
   * ou que le navigateur pouvait geler l'interface utilisateur pendant qu'il attendait la réponse du serveur.
   * Cela ne fonctionnera pas lorsque PersonneService fait des demandes à un serveur distant. 
   */
  
   /**La méthode PersonneService.getPersonnes retourne un <personne[]> observable. 
    * Mais il faut s'adapter ici pour renvoyer un personne[].   
    */
  getPers(): void {
    this.personneService.getPersonnes().subscribe(personnes => this.listPersonnes = personnes);
  }
 /**Cette nouvelle version attend que l'Observable émette toute une panoplie de pers,
   *  ce qui pourrait arriver maintenant ou dans quelques minutes. Ensuite,
   *  subscribe passe le tableau lors du rappel, ce qui définit la propriété personnes du composant.
   *  Cette approche asynchrone fonctionnera lorsque PersonneService demandera des pers au serveur. 
  */


  /** */
  add(name: string): void {
    name = name.trim();
    if (!name) { return; } 
    //p: Personne; pourquoi p n'est pas un var ici ?????????????????????
    this.personne={id: null, name:''};
    this.personne.name = name;

   // this.personneService.addPersonne({name} as Personne )   !!!!!!
    this.personneService.addPersonne(this.personne )
      .subscribe(p => {
        this.listPersonnes.push(p);
      });
  }

}


