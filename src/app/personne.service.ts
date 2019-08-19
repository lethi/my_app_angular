import { Injectable } from '@angular/core';
import {Personne} from './personne';
//import {PERSONNES} from './mock-personnes';
import { Observable, of } from 'rxjs';
import {MessageService} from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpHeaders ={
  headers : new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root',
})
export class PersonneService {

  /** 'api': is the resource to which requests are made, 
  /!\ 'personnesMock':must be the same as personnes collection 
   in the in-memory-data-service.ts*/
  private personnesUrl = 'api/personnesMock';  

  /**Inject MessageService dans le constructeur PersonneService */
  constructor(private messageService : MessageService, 
              private httpClient: HttpClient) { }

  /** this method has a synchronous signature */
  // getPersonnes(): Personne[]{
  //   return PERSONNES;
  // }

  /**PersonneService doit attendre que le serveur réponde, 
   * getPersonnes () ne peut pas retourner immédiatement les données 
   * et le navigateur ne se bloquera pas tant que le service attend.
   * PersonneService.getPersonnes() doit avoir une signature asynchrone.
   * Cela pourrait retourner une promesse. Il pourrait retourner un observable. */

   /*The méthod uses the RxJS of() function to return an array of mock heroes as an Observable<Personne[]>. */
  getPersonnes(): Observable<Personne[]>{
    //return of(PERSONNES);
    /*use now httpClient for get Personnes*/
    return this.httpClient.get<Personne[]>(this.personnesUrl)
    .pipe( /** gestion des erreurs avec catchError*/
      tap(_ => this.log('method getPersonnes:'),
      catchError(this.gererError('getPersonnes', []))
    ));
  }

  private gererError<T> (operation = 'operation', result?:T){
    return (error:any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead
 
    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);
 
    // Let the app keep running by returning an empty result.
    return of(result as T);
    };
    
  }

  private log(message: string): void{
    this.messageService.addMesage('trentrentren');
  }

  getPersonneById(id : number): Observable<Personne>{
    const urlPers = `${this.personnesUrl}/${id}`;

    return this.httpClient.get<Personne>(urlPers).pipe(
      tap( _ => this.log(`getPersonneById`)),
      catchError(this.gererError<Personne>(`getPersonneById`))
    );
   // return of(PERSONNES.find(pers => pers.id === id));
  }

  updatePersonne(pers : Personne): Observable<any> {
    /*'personnesUrl' : lien vers Collections mockés ds 'in-memory-data-service.ts'*/
    return this.httpClient.put(this.personnesUrl, pers, httpHeaders).pipe(
      /**traiter error */
      tap( _ => this.log(`updatePersonne : id=${pers.id}`)),
      catchError(this.gererError<any>('updatePersonne'))
    );
  }

  addPersonne(pers: Personne): Observable<Personne>{
    return this.httpClient.post(this.personnesUrl, pers, httpHeaders).pipe(
      tap( (p: Personne) => this.log(`addPersonne w/ id=${p.id}`)),
      catchError(this.gererError<Personne>(`addPersonne`))
    );
  }


  
 
}
