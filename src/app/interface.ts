export interface Player{
    Id:number;
    Name:string;
    LevelId:number;
    Level:Level;
  }

export interface Spell{
    Id:number;
    Name:string;
    Description:string;
}

export interface Monsters{
    Id:number;
    Name:string;
    Text:string;
    Spells:Spell[];
    Image:string;
}

export interface Level{
    Id:number;
    Name:string;
    Text:string;
    Image:string;
    Monsters:Monsters[];
}

