import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { MatButtonModule }      from '@angular/material/button';
import { InscriptionComponent } from './inscription/inscription.component';
import { GameComponent } from './game/game.component';
import { AideComponent } from './aide/aide.component'
import { MatFormFieldModule   } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatChipsModule  } from '@angular/material/chips';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatGridListModule}    from '@angular/material/grid-list';
import { MatTooltipModule }    from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { VG } from './vg';
import { PizzaPartyComponent, SnackBarComponentExample } from './snackbar/snack-bar-component-example';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from './game/game.component';





@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSelectModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatGridListModule, 
    MatTooltipModule,
    MatCardModule,  
    MatSnackBarModule,
    MatDialogModule,

  ],
  entryComponents: [SnackBarComponentExample, PizzaPartyComponent, DialogOverviewExampleDialog],
  declarations: [
    AppComponent,
    DashboardComponent,
    InscriptionComponent,
    GameComponent,
    AideComponent,
    SnackBarComponentExample,
    PizzaPartyComponent,
    DialogOverviewExampleDialog,

  ],
  providers: [ VG ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
