import { Component, OnInit } from '@angular/core';
import { CharacterClass, PartyClass, IntitiativeRecordClass, PartyMembersClass } from '../../shared/models';
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
  public SelectedPartyID: string;
  public SelectedPartyIDToAdd: string;
  public InitiativesList: IntitiativeRecordClass[] = [];
  
  //vars for adding new characters
  public Name: string = "";
  public Speed: number = 2;
  public Dex: number = 10;

  constructor(
    private trackerService: TrackerService,
    private modalService: ModalService,
  ) { }

  ngOnInit() {

    this.GetListOfParties();

  }

  RemoveCharacter(Char: CharacterClass) {
    let nameToRemove: string = Char.Name;
    let index: number = this.CharacterList.map(x => x.Name).indexOf(nameToRemove);

    //Remove this Character from Character List
    this.CharacterList.splice(index, 1);

    //here we remove the character from rolled Initiatives
    for (let i = 0; i < this.InitiativesList.length; i++) {
      if (i > -1) {
        if (this.InitiativesList[i].Name === Char.Name) {
          this.InitiativesList.splice(i, 1)
        }
      }
    }
  }

  public GetSelectedParty() {
    console.log(this.SelectedPartyID);
    this.GetStringOfIDsFromSelectedParty(this.SelectedPartyID, false);
  }

  public AddAnotherParty() {
    this.GetStringOfIDsFromSelectedParty(this.SelectedPartyIDToAdd, true);
  }

  addAnotherCharacter() {

    //this function is be called to add aditional characters from the DOM
    this.modalService.ShowCharacterAdderPicker().subscribe((selectedCharacter: CharacterClass) => {

      if (selectedCharacter) {

        this.PushToCharacterList(selectedCharacter);

      } 

    });
  }

  addExistingCharacter() {

    //this function is be called to add aditional characters from the DOM
    this.modalService.ShowCharacterSelectorPicker().subscribe((selectedCharacter: CharacterClass) => {

      if (selectedCharacter) {

          this.PushToCharacterList(selectedCharacter);

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
    this.CharacterList = [];
    this.GetStringOfIDsFromSelectedParty(this.SelectedPartyID, false);
  }

  clearInitiatives() {
    this.InitiativesList = [];
  }

  //Database functions

  private GetListOfParties() {
    this.trackerService.PartyBusinessClass.GetMultipleAsObject().subscribe(
      (data: PartyClass[]) => {
        this.PartyList = data;
        this.SelectedPartyID = this.PartyList[0]._id;
        this.GetStringOfIDsFromSelectedParty(this.SelectedPartyID, false);
      }
    );
  }

  private GetStringOfIDsFromSelectedParty(groupID: string, addToExistingList: boolean) {

    //this.StringOfIDs = "";
    
    let StringOfIDs: string = ""

    this.trackerService.PartyBusinessClass.GetMultiplePartyMembersAsObject(groupID).subscribe(
      (data: PartyMembersClass[]) => {

        for (var i = 0; i < data.length; i++) {
          if (i === 0) {
            StringOfIDs = data[i].CharacterID;
          } else {
            StringOfIDs = StringOfIDs + ";" + data[i].CharacterID;;
          }
        }

        if (StringOfIDs !== "") {
          if (addToExistingList === true) {
            this.GetCharactersToAddByStringOfIDs(StringOfIDs);
          } else {
            this.GetCharactersByStringOfIDs(StringOfIDs);
          }
        } 

      }
    );

  }

  private GetCharactersByStringOfIDs(StringOfIDs: string) {
    this.trackerService.CharacterBusinessClass.GetMultibleAsObjectStringOfIDs(StringOfIDs).subscribe(
      (data: CharacterClass[]) => {
        this.CharacterList = data
      }
    );
  }

  private GetCharactersToAddByStringOfIDs(StringOfIDs: string) {
    this.trackerService.CharacterBusinessClass.GetMultibleAsObjectStringOfIDs(StringOfIDs).subscribe(
      (data: CharacterClass[]) => {
        //TODO: need to loop through results and push them to CharacterList
        for (var i = 0; i < data.length; i++) {

          this.PushToCharacterList(data[i]);

        }
      }
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

  IsCharacterAlreadyInList(Name: string) {

    for (let i = 0; i < this.CharacterList.length; i++) {
      if (this.CharacterList[i].Name === Name) {
        return true;
      }
    }

    return false;
  }

  PushToCharacterList(CharacterToPush: CharacterClass) {

    this.Name = CharacterToPush.Name;
    this.Speed = CharacterToPush.Speed;
    this.Dex = CharacterToPush.Dex;

    let NameIsUnique: boolean = false
    let nameIncrementor: number = 0;

    while (NameIsUnique === false) {
      if (this.IsCharacterAlreadyInList(this.Name) === false) {
        this.CharacterList.push({ Name: this.Name, Speed: Number(this.Speed), Dex: this.Dex });
        NameIsUnique = true;
      } else {
        nameIncrementor++;
        this.Name = CharacterToPush.Name + nameIncrementor.toString();
      }
    }

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

}
