//import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Personne} from './personne'

// @Injectable({
//   providedIn: 'root'
// })
export class InMemoryDataService implements InMemoryDbService {

  //creat mock data base
  createDb() {
    const personnesMock = [
      { id: 11, name: 'thanh-maria' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    return {personnesMock};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(personnes: Personne[]): number {
    return personnes.length > 0 ? Math.max(...personnes.map(pers => pers.id)) + 1 : 11;
  }
}
