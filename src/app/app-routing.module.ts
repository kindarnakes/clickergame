import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayComponent } from './play/play.component';
import { RoomComponent } from './room/room.component';
import { GameconService } from './service/gamecon.service';

const routes: Routes = [
  {path:'', component:RoomComponent},
  {path: ':id/game', component:PlayComponent, canActivate:[GameconService]},
  {path:'**', component: RoomComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
