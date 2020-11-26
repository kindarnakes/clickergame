import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clickerGame';
  initClicked:boolean = false;
  named:boolean = false;

  constructor(){}


  initClick():void{
    this.initClicked = true;
  }




}
