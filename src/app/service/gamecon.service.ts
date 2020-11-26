import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { game } from 'src/model/game';
import { member } from 'src/model/member';

@Injectable({
  providedIn: 'root'
})
export class GameconService {

  private DBNAME:string = "games";
  private DB:AngularFireList<game>;
  private team:boolean; //false RED, true BLUE
  private game:string;
  private creator:boolean = false;
  private activated:boolean = false;

  constructor(private http: AngularFireDatabase, private router: Router) { 
    this.DB = this.http.list(this.DBNAME);
  }

  public createGame(creator:member){
    let game:game = {
      blue_members : this.isBlue()?[creator]:[],
      red_members : this.isRed()?[creator]:[],
      blue_points: 0,
      red_points : 0,
      started : false
    }
    return this.DB.push(game);
  }

  public getGame(id:string){
    return this.http.object(this.DBNAME+ "/" +  id).snapshotChanges();
  }

  public putGame(id:string, game:game){
    return this.http.object(this.DBNAME+ "/" +  id).update(game);
  }

  public deleteGame(id:string){
    return this.http.object(this.DBNAME+ "/" +  id).remove();
  }

  public setTeam(team:boolean):void{
    this.team = team;
  }

  public isBlue():boolean{
    return this.team;
  }

  public isRed():boolean{
    return !this.team;
  }

  public setActualGameKey(game:string):void{
    this.game = game;
  }

  public getActualGameKey():string{
    return this.game; 
  }

    public created():void{
    this.creator = true;
  }
  public notCreated():void{
    this.creator = false;
  }

  public isCreated():boolean{
    return this.creator; 
  }

  public blue(id, points){
    return this.http.object(this.DBNAME+ "/" +  id + "/blue_points").set(points);
  }

  public red(id, points){
    return this.http.object(this.DBNAME+ "/" +  id + "/red_points").set(points);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.activated){
      return true;
    }else{
      this.router.navigateByUrl('/');
      return false;
    }
  }

  activate(){
    this.activated = true;
  }

  deactivate(){
    this.activated = false;
  }

}
