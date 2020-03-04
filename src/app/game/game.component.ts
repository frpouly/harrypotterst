import { Component, OnInit, Inject } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { VG } from '../vg'
import { Player, Level, Spell, Monsters } from '../interface'
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SnackBarComponentExample } from '../snackbar/snack-bar-component-example'
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
     'Access-Control-Allow-Origin': '*'
  })
};

export interface ChipColor {
  name: string;
  color: ThemePalette;
}

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: [ './game.component.css' ],
  providers: [MatSnackBar, SnackBarComponentExample]
})


export class GameComponent {
  
  constructor(private http: HttpClient, public vg:VG, private s:SnackBarComponentExample, public dialog: MatDialog)
  {}

  el: HTMLElement;
  el2: HTMLElement;
  playerId:string;
  playerName:string;
  current_level:Level;
  p:Player;
  colors:ChipColor[] = [{name:'', color:'primary'},
                        {name:'', color:'accent'},
                        {name:'', color:'warn'},
];
  monstersSpells: Spell[];
  availableSpells: Spell[] = [];
  selectedSpells: Spell[] = [];
  levelMonsters: Monsters[] = [];

  async ngOnInit() 
  {
    this.playerId = localStorage.getItem("playerId");
    this.playerName = localStorage.getItem("playerName");

    console.log(this.playerId + " / " + this.playerName);
    
    this.updateComponent();
  }
  
  
  onValChange(spell:Spell)
  {
    if (this.selectedSpells.includes(spell))
    {
      const index = this.selectedSpells.indexOf(spell, 0);
      if (index > -1)
      {
        this.selectedSpells.splice(index, 1);
      }
    }
    else
    {
      this.selectedSpells.push(spell);
    }
    console.log("Liste des spells selectionnes : " + this.selectedSpells);
  }
  
  delay(ms: number) 
  {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async abracadabra()
  {
    this.monstersSpells = [];
    for (let i = 0; i < this.levelMonsters.length; i++)
    {
      for (let j = 0; j < this.levelMonsters[i].Spells.length; j++)
      {
          this.monstersSpells.push(this.levelMonsters[i].Spells[j])
      }
    }
    

    if (this.compareArray(this.monstersSpells, this.selectedSpells))
    {
      if (this.p.LevelId >= 10)
      {
        this.openDialog();
      }
      else
      {
        await this.nextLevel();
        console.log("On update la page !");
        this.updateComponent();
      }
    }
    else
    {
      console.log("Pas égale !");
      this.s.openSnackBar();
    }
  }

  comp(a:Spell, b:Spell) : number {
    if (a.Id > b.Id) return 1;
    if (a.Id < b.Id) return -1;
    return 0;
  }

  compareArray(array1:any[], array2:any[]) : boolean
  {
    
    console.log(array1.sort(this.comp));
    console.log(array2.sort(this.comp));


    return array1.length === array2.length && array1.every(function(value, index) { console.log(value.Name + " / " + array2[index].Name) ; return value.Name === array2[index].Name});
  }

  getPlayer(id:string) 
  {
    return this.http.get<Player>(this.vg.urlApi + "player/" + id).toPromise();
  }
  getSpells()
  {
    return this.http.get<Spell[]>(this.vg.urlApi + "spell").toPromise();
  }

  nextLevel()
  {
    console.log(this.vg.urlApi + "player", '{"Id": ' + this.playerId + ', "Name":"'+ this.playerName + '","LevelId": ' + (this.p.Level.Id+1) +', "Level": {}');
    return this.http.put<Player>(this.vg.urlApi + "player", '{"Id": ' + this.playerId + ', "Name":"'+ this.playerName + '","LevelId":' + (this.p.Level.Id+1) +', "Level": {}', httpOptions).toPromise();
  }

  async updateComponent()
  {
    this.selectedSpells = [];
    this.el = document.getElementById('level-text');
    this.el2 = document.getElementById('level-image');
    this.p = await this.getPlayer(this.playerId);
    this.el.innerText = this.p.Level.Text;
    this.el2.setAttribute("src", this.p.Level.Image);
    this.levelMonsters = this.p.Level.Monsters;
    this.availableSpells = await this.getSpells();
  }


    openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '40%',
      data: {name: this.playerName}
    });
  }
}

@Component({
  selector: 'app-game',
  templateUrl: 'victoire.component.html',
  styleUrls: [ './game.component.css' ],
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
