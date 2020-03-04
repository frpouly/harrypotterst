import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VG } from '../vg'
import { Player } from '../interface'
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
     'Access-Control-Allow-Origin': '*'
  })
};


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: [ './inscription.component.css' ]
})

export class InscriptionComponent {

  constructor(private router: Router, private http: HttpClient, public vg:VG)
  {
    localStorage.clear();
  }
  playerId:number;

  async onClickMe(name) 
  {
    await this.addPlayer('{"Id": 0, "Name":"'+ name.value + '","LevelId": 1, "Level": {}');
    await this.getPlayers().then(res => {this.playerId = res[res.length - 1].Id});
    localStorage.setItem("playerName", name.value);
    localStorage.setItem("playerId", this.playerId.toString());
    this.router.navigate(['/game']);
  }


  addPlayer(player: string) 
  {  
    return this.http.post<string>(this.vg.urlApi + "player", player, httpOptions).toPromise();
  }

  getPlayers() 
  {
    return this.http.get<Player[]>(this.vg.urlApi + "player").toPromise();
  }

}
