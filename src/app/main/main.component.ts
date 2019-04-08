import { Component, OnInit } from '@angular/core';
import { CharacterClass, IntitiativeRecordClass} from '../../shared/models';
//import * as heroData from '../../data/superheroes.json'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {

  public CharacterList: CharacterClass[];  
  //public BaseCharactersList: CharacterClass[] = heroData.default
  public InitiativesList: IntitiativeRecordClass[] = [];
  
  //vars for adding new characters
  public Name: string = "";
  public Speed: number = 2;
  public Dex: number = 10;

  //public testResult: number = 0;

  constructor() { }

  ngOnInit() {
    this.addBaseCharacters();
  }

  addBaseCharacters() {
    console.log("AddBaseFired");
    //add the basic characters for this game

    //this.CharacterList = this.BaseCharactersList;
    this.CharacterList = this.NewSalemCharacters();
 
  }

  RemoveCharacter(Char: CharacterClass) {
    let nameToRemove: string = Char.Name;
    let index: number = this.CharacterList.map(x => x.Name).indexOf(nameToRemove);

    this.CharacterList.splice(index, 1);
  }

  addAnotherCharacter() {
    //this function will be called to add aditional characters from the DOM
    this.CharacterList.push({Name: this.Name, Speed: Number(this.Speed), Dex: this.Dex});
  }

  getInitiativesFromSpeed(Speed: number, Dex: Number) {

    let randomRootNumber: number;
    let intervalNumber: number;

    randomRootNumber = this.getRandomRootNumber(Speed);
    intervalNumber = this.getIntervalNumber(Speed);

  }

  getInitiatives() {
    //this.testResult = this.generateRandomNumber(6);

    console.log(this.CharacterList);

    this.InitiativesList = [];

    for (let i = 0; i < this.CharacterList.length; i++) {
      let thisCharactersSpeed: number = this.CharacterList[i].Speed;
      let firstInitiative: number = this.generateRandomNumber(this.getRandomRootNumber(this.CharacterList[i].Speed)) 
      let interval: number = this.getIntervalNumber(this.CharacterList[i].Speed);
      let chrName: string = this.CharacterList[i].Name;
      let chrDex: number = this.CharacterList[i].Dex;

      for (let i2 = 0; i2 < thisCharactersSpeed; i2++) {

        let nextInitiativeRecord: IntitiativeRecordClass;
        nextInitiativeRecord = new IntitiativeRecordClass;
        nextInitiativeRecord.Name = chrName;
        nextInitiativeRecord.Dex = chrDex;

        if (i2 === 0) {
          nextInitiativeRecord.Round = firstInitiative;
          nextInitiativeRecord.ActionNumber = i2 + 1;
        } else {
          nextInitiativeRecord.Round = firstInitiative + (interval * i2);
          nextInitiativeRecord.ActionNumber = i2 + 1;
        }

        this.InitiativesList.push(nextInitiativeRecord);
      }
    }

    this.sortInitiativeList();
  }

  resetCharacterList() {
    this.CharacterList = [];
    this.addBaseCharacters();
  }

  clearInitiatives() {
    this.InitiativesList = [];
  }

  //helper functions section

  getIntervalNumber (Speed: number) {

    let intervalNumber: number;

    if (Speed === 2) {
      intervalNumber = 6;
    } else if (Speed === 3) {
      intervalNumber = 4;
    } else if (Speed === 4) {
      intervalNumber = 3;
    } else if (Speed === 5) {
      intervalNumber = 2;
    } else if (Speed === 6) {
      intervalNumber = 2;
    } else {
      intervalNumber = 1;
    }

    return intervalNumber;
  }

  getRandomRootNumber (Speed: number) {

    let randomRootNumber: number;

    if (Speed === 2) {
      randomRootNumber = 6;
    } else if (Speed === 3) {
      randomRootNumber = 4;
    } else if (Speed === 4) {
      randomRootNumber = 3;
    } else if (Speed === 5) {
      randomRootNumber = 3;
    } else if (Speed === 12) {
      randomRootNumber = 1;
    } else {
      randomRootNumber = 2;
    }

    return randomRootNumber;
  }

  generateRandomNumber (Speed: number) {
    let result: number;
    result = Math.floor(Math.random() * Speed) + 1
    return result;
  }

  sortInitiativeList() {
    
    this.InitiativesList = this.InitiativesList.sort(function (a, b): any {
      const initA = new Number(a["Dex"]);
      const initB = new Number(b["Dex"]);
      return initB > initA ? 1: initB < initA ? -1: 0;
    });

    this.InitiativesList = this.InitiativesList.sort(function (a, b): any {
      const initA = new Number(a["Round"]);
      const initB = new Number(b["Round"]);
      return initB < initA ? 1: initB > initA ? -1: 0;
    });
  }

  //Arrays of Characters

  public NewSalemCharacters() {
    return [
      {
          Name: "Artimus", 
          Speed: 2, 
          Dex: 22
      },
      {
          Name: "Molly", 
          Speed: 3, 
          Dex: 18
      },
      {
          Name: "Apogee", 
          Speed: 4, 
          Dex: 20
      },
      {
          Name: "Night Ape", 
          Speed: 4, 
          Dex: 12
      },
      {
          Name: "Talmonis", 
          Speed: 3, 
          Dex: 10
      }
    ];
  }

}
