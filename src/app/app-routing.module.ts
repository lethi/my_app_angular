import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PersonneComponent} from './personne/personne.component'
import { DashboardComponent } from './dashboard/dashboard.component';
import {PersonneDetailComponent} from './personne-detail/personne-detail.component';

/**définir un tableau de routes avec une seule route vers un composant
 * path: '' -> est un default route
*/
const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'personne-detail/:id', component: PersonneDetailComponent},
  {path: 'allPersonnes', component: PersonneComponent}
];

@NgModule({
  /**initialiser le routeur et le démarrer à l’écoute des changements d’emplacement du navigateur
   * Ajoutez RouterModule au tableau @ NgModule.imports et configurez-le
   * avec les routes en une étape en appelant RouterModule.forRoot().
   * La méthode s'appelle forRoot () car vous configurez le routeur au niveau racine de l'application.
   *  La méthode forRoot () fournit les fournisseurs de services et les directives nécessaires au routage, 
   * et effectue la navigation initiale en fonction de l'URL du navigateur actuel.
   */
  imports: [RouterModule.forRoot(routes)],

  /**Ajoutez un tableau contenant RouterModule dans @ NgModule.exports.
   * RouterModule permet d'utiliser les directives de routeur dans les composants AppModule
   * */
  exports: [RouterModule]
})
export class AppRoutingModule { }
