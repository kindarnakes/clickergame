import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { game } from 'src/model/game';
import { member } from 'src/model/member';
import { GameconService } from '../service/gamecon.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  nameForm: FormGroup;
  player: member;
  chooseCreate: boolean = false;
  chooseJoin: boolean = false;


  constructor(private pf: FormBuilder, private game: GameconService, private router: Router) {
    this.nameForm = this.pf.group({
      name: ['', Validators.required],
      room: ['', this.chooseCreate ? [] : [Validators.required]]
    });
  }

  create(): void {
    this.chooseCreate = true;
  }

  join(): void {
    this.chooseJoin = true;
  }

  ngOnInit(): void {
  }

  onSubmitRed(): void {
    this.game.setTeam(false);

    this.onSubmit();
  }

  onSubmitBlue(): void {
    this.game.setTeam(true);
    this.onSubmit();
  }

  onSubmit(): void {
    this.player = {
      name: this.nameForm.get('name').value as string
    }

    if (this.chooseCreate) {
      this.game.createGame(this.player).then((game) => {
        this.game.setActualGameKey(game.key);
        this.game.created();
        this.game.activate();
        this.router.navigate(['/' + game.key + "/game"]);
      }).catch((err) => {
        console.log(err);
      });
    }

    if (this.chooseJoin) {
      this.game.getGame(this.nameForm.get('room').value as string).pipe(take(1)).subscribe((game) => {
        if (game.key != null) {
          let aux: game = { ...game.payload.val() as game };
          if (!aux.started) {
            if (this.game.isRed()) {
              aux.red_members == null ? aux.red_members = [this.player] : aux.red_members.push(this.player);
            } else {
              aux.blue_members == null ? aux.blue_members = [this.player] : aux.blue_members.push(this.player);
            }
            this.game.putGame(game.key, aux).then(() => {
              this.game.setActualGameKey(game.key);
              this.game.notCreated();
              this.game.activate();
              this.router.navigate(['/' + game.key + "/game"]);
            }).catch((err) => {
              console.log(err);
            });
          } else {
            alert("El juego ha empezado ya");
          }
        } else {
          alert("La sala no existe");
        }
      });

    }
  }

}
