import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { take } from 'rxjs/operators';
import { game } from 'src/model/game';
import { GameconService } from '../service/gamecon.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  match: game = {
    blue_members: [],
    red_members: [],
    red_points: 0,
    blue_points: 0,
    started: false
  };

  start: boolean = false;
  creator: boolean;

  private in: Observer<any> = null;

  textButton: string = "Espere ...";
  buttonActive: boolean = true;



  constructor(public game: GameconService, private activatedRouter: ActivatedRoute, private router: Router) {
    let id: any;
    this.game.deactivate();
    this.activatedRouter.params.pipe(take(1)).subscribe((data) => {
      id = data['id'];
      this.creator = this.game.isCreated();
    });

    let sub = this.game.getGame(id).subscribe((data) => {
      if ((data.payload.val() as game).started && !this.match.started) {
        this.createObservable().subscribe((data) => {
          this.textButton = data;
        });
        for (let i = 0; i < 6; i++) {
          setTimeout(() => {
            this.in.next(5 - i);
          }, 1000 * i);
        }
        setTimeout(() => {
          this.in.complete();
          this.start = true;
        }, 6000);

      }
      this.match = {
        key: data.key,
        ...data.payload.val() as game
      };
      if (this.match.blue_points >= 100 && this.match.blue_points > this.match.red_points) {
        setTimeout(() => {
          alert("¡Ha ganado el equipo azul!");
          this.router.navigate(['/']);
        }, 500);
        sub.unsubscribe();
      } else if (this.match.red_points >= 100 && this.match.blue_points < this.match.red_points) {
        setTimeout(() => {
          alert("¡Ha ganado el equipo rojo!");
          this.router.navigate(['/']);
        }, 500);
        sub.unsubscribe();
      } else if (this.match.blue_points >= 100 && this.match.red_points >= 100) {
        setTimeout(() => {
          alert("¡Empate!");
          this.router.navigate(['/']);
        }, 500);
        sub.unsubscribe();
      }
    });
  }

  ngOnInit(): void {
  }

  public startClick(): void {
    this.creator = false;
    this.match.started = true;
    this.game.putGame(this.match.key, this.match);
    this.match.started = false;
  }

  public redClick() {
    if (this.buttonActive) {
      this.match.red_points = this.match.red_points + 1;
      this.game.red(this.match.key, this.match.red_points);
      this.buttonClickInterval();
    }
  }

  public blueClick() {
    if (this.buttonActive) {
      this.match.blue_points = this.match.blue_points + 1;
      this.game.blue(this.match.key, this.match.blue_points);
      this.buttonClickInterval();
    }
  }

  public createObservable(): Observable<any> {
    return new Observable((observer) => {
      this.in = observer;
    });
  }

  buttonClickInterval(){
    this.buttonActive = false;
    setInterval(()=>{
      this.buttonActive = true;
    }, 300);
  }

}
