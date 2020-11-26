import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { GameconService } from './service/gamecon.service';
import { RoomComponent } from './room/room.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlayComponent } from './play/play.component';

@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    PlayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [GameconService],
  bootstrap: [AppComponent]
})
export class AppModule { }
