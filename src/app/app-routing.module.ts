import { NgModule, Component }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { InscriptionComponent }   from './inscription/inscription.component';
import { GameComponent } from './game/game.component';
import { AideComponent } from './aide/aide.component'

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'inscription', component: InscriptionComponent},
  { path: 'game', component: GameComponent},
  { path: 'aide', component: AideComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
