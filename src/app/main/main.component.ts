import { Component, OnInit } from '@angular/core';
import { CharacterClass, PartyClass, IntitiativeRecordClass } from '../../shared/models';
import { TrackerService } from '../../shared/services/tracker.service';
import { ModalService } from '../../shared/services/modal.service';

//import * as heroData from '../../data/superheroes.json'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {

  public CharacterList: CharacterClass[];
  public PartyList: PartyClass[];
  public SelectedPartyID: number;
  public InitiativesList: IntitiativeRecordClass[] = [];
  
  //vars for adding new characters
  public Name: string = "";
  public Speed: number = 2;
  public Dex: number = 10;

  //public testResult: number = 0;

  constructor(
    private trackerService: TrackerService,
    private modalService: ModalService,
  ) { }

  ngOnInit() {
    this.getPartyList();
    //Set SelectedPartyID to 1 / first party in list
    this.SelectedPartyID = 1;
    this.GetCharacterListFromPartyID(this.SelectedPartyID);

    //TODO: Initialize Data calls to API
    //this.GetAllCharacters();
  }

  getPartyList() {
    //TODO: Get this list from api rather than object below
    this.PartyList = this.ListOfParites();
  }

  RemoveCharacter(Char: CharacterClass) {
    let nameToRemove: string = Char.Name;
    let index: number = this.CharacterList.map(x => x.Name).indexOf(nameToRemove);

    this.CharacterList.splice(index, 1);
  }

  public GetSelectedParty() {
    this.GetCharacterListFromPartyID(this.SelectedPartyID);
  }

  addAnotherCharacter() {

    //this function is be called to add aditional characters from the DOM
    this.modalService.ShowCharacterAdderPicker().subscribe((selectedCharacter: CharacterClass) => {

      if (selectedCharacter) {

        this.Name = selectedCharacter.Name;
        this.Speed = selectedCharacter.Speed;
        this.Dex = selectedCharacter.Dex;

        this.CharacterList.push({ Name: this.Name, Speed: Number(this.Speed), Dex: this.Dex });
      } 

    });
  }

  getInitiativesFromSpeed(Speed: number, Dex: Number) {

    let randomRootNumber: number;
    let intervalNumber: number;

    randomRootNumber = this.getRandomRootNumber(Speed);
    intervalNumber = this.getIntervalNumber(Speed);

  }

  getInitiatives() {
    //this.testResult = this.generateRandomNumber(6);

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
    //this.CharacterList = [];
    this.GetCharacterListFromPartyID(this.SelectedPartyID);
  }

  clearInitiatives() {
    this.InitiativesList = [];
  }

  GetCharacterListFromPartyID(PartyID: number) {
    //TODO: replace this code with data from api
    if (PartyID == 2) {
      this.CharacterList = this.NatesRomanCharacters();
    } else {
      //for now we will default to New Salem Characters if nothing else found
      this.CharacterList = this.NewSalemCharacters();
    }
  }
  //Database functions

  private GetAllCharacters() {
    this.trackerService.CharacterBusinessClass.GetMultipleAsObject().subscribe(
      (data: CharacterClass[]) => { console.log(data) }
    );
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

  //Arrays of DATA -  Characters, Parties etc
  //TODO:  Replace these lists with data from Service

  public NewSalemCharacters() {
    return [
      {
          Name: "Artimus", 
          Speed: 2, 
          Dex: 22
      },
      {
          Name: "Jenya", 
          Speed: 3, 
          Dex: 13
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

  public NatesRomanCharacters() {
    return [
      {
        Name: "Troya",
        Speed: 2,
        Dex: 10
      },
      {
        Name: "Marcus",
        Speed: 3,
        Dex: 18
      },
      {
        Name: "Vitus",
        Speed: 3,
        Dex: 20
      },
      {
        Name: "Aria",
        Speed: 3,
        Dex: 12
      },
      {
        Name: "Stronai",
        Speed: 3,
        Dex: 12
      }
    ];
  }

  public ListOfParites() {
    return [
      {
        Party: "New Salem Characters",
        ID: 1
      },
      {
        Party: "Nates Roman Characters",
        ID: 2
      }
    ];
  }

}
