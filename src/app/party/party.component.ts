import { Component, OnInit } from '@angular/core';
import { CharacterClass, PartyClass, PartyMembersClass } from '../../shared/models';
import { TrackerService } from '../../shared/services/tracker.service';
import { ModalService } from '../../shared/services/modal.service';
import { UtilityService } from '../../shared/services/utility.service';
import { HttpErrorResponse } from '@angular/common/http';

//import * as heroData from '../../data/superheroes.json'

@Component({
  selector: 'app-main',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.scss']
})
export class PartyComponent implements OnInit {

  public CharacterList: CharacterClass[];
  public PartyList: PartyClass[];
  public PartyMembersList: PartyMembersClass[];
  public SelectedParty: PartyClass;
  public SelectedPartyID: string;
  public SelectedPartyName: string;
  
  //vars for adding new characters
  public Name: string = "";
  public Speed: number = 2;
  public Dex: number = 10;

  constructor(
    private trackerService: TrackerService,
    private modalService: ModalService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.GetAllPartys();
  }

  //Database functions

  private GetAllPartys() {
    this.trackerService.PartyBusinessClass.GetMultipleAsObject().subscribe(
      (data: PartyClass[]) => {
        this.PartyList = data;
        this.PartyList.sort((a, b) => a.GroupName.localeCompare(b.GroupName));
      }
    );
  }

  private GetStringOfIDsFromSelectedParty(groupID: string) {

    //this.StringOfIDs = "";

    let StringOfIDs: string = ""

    this.trackerService.PartyBusinessClass.GetMultiplePartyMembersAsObject(groupID).subscribe(
      (data: PartyMembersClass[]) => {

        this.PartyMembersList = data;

        for (var i = 0; i < data.length; i++) {
          if (i === 0) {
            StringOfIDs = data[i].CharacterID;
          } else {
            StringOfIDs = StringOfIDs + ";" + data[i].CharacterID;;
          }
        }

        if (StringOfIDs !== "") {
          this.GetCharactersByStringOfIDs(StringOfIDs);
        } else {
          this.CharacterList = [];
        }

      }
    );

  }

  private GetCharactersByStringOfIDs(StringOfIDs: string) {
    this.trackerService.CharacterBusinessClass.GetMultibleAsObjectStringOfIDs(StringOfIDs).subscribe(
      (data: CharacterClass[]) => {
        this.CharacterList = data
        this.CharacterList.sort((a, b) => a.Name.localeCompare(b.Name));
      }
    );
  }

  addNewParty() {

    //this function is be called to add aditional characters from the DOM
    this.modalService.ShowPartyAdderPicker().subscribe((selectedParty: PartyClass) => {

      if (selectedParty) {

        //TODO: Call Update Character function
        this.trackerService.PartyBusinessClass.AddParty(selectedParty)
          .subscribe(() => {
            this.utilityService.ShowSuccess("The Character was successfully Added");
            this.PartyList = [];
            this.GetAllPartys();
          },
            (err: HttpErrorResponse) => {
              if (this.utilityService.IsErrorListResponse(err)) {
                //TODO:  Deal with list response
              } else {
                let ErrorMessage: string = this.utilityService.GetErrorMessageFromResponse(err);
                this.utilityService.ShowError(ErrorMessage);
              };
            });

      }

    });
  }

  DeleteParty(Item: PartyClass) {

    this.modalService
      .ShowConfirmation("Delete Confirmation", `Are you sure you want to delete '${Item.GroupName}'?`)
      .subscribe(
        (result: boolean) => {
          if (result) {
            this.trackerService.PartyBusinessClass.DeleteParty(Item._id).subscribe(() => {
              this.utilityService.ShowSuccess(`'${Item.GroupName}' was successfully deleted.`);
              this.PartyList = [];
              this.GetAllPartys();
            },
              (err: HttpErrorResponse) => {
                let ErrorMessage: string = this.utilityService.GetErrorMessageFromResponse(err);
                this.utilityService.ShowError(ErrorMessage);
              });
          }
        }
      );

  }

  SelectParty(Item: PartyClass) {
    this.SelectedPartyID = Item._id;
    this.SelectedPartyName = Item.GroupName;
    this.GetStringOfIDsFromSelectedParty(Item._id);
  }

  cancelEditParty() {
    this.SelectedPartyID = "";
    this.SelectedPartyName = "";
    this.CharacterList = null;
  }

  //helper functions section

  addNewPartyMember() {

    //this function is be called to add aditional characters a party
    this.modalService.ShowCharacterSelectorPicker().subscribe((selectedCharacter: CharacterClass) => {

      if (selectedCharacter) {

        let NewPartyMember: PartyMembersClass;
        NewPartyMember = new PartyMembersClass;

        NewPartyMember.GroupID = this.SelectedPartyID;
        NewPartyMember.CharacterID = selectedCharacter._id;

        //TODO: Call Update Character function
        this.trackerService.PartyBusinessClass.AddPartyMember(NewPartyMember)
          .subscribe(() => {
            this.utilityService.ShowSuccess("The Character was successfully Added");
            this.CharacterList = [];
            this.GetStringOfIDsFromSelectedParty(this.SelectedPartyID);
          },
            (err: HttpErrorResponse) => {
              if (this.utilityService.IsErrorListResponse(err)) {
                //TODO:  Deal with list response
              } else {
                let ErrorMessage: string = this.utilityService.GetErrorMessageFromResponse(err);
                this.utilityService.ShowError(ErrorMessage);
              };
            });

      }

    });
  }

  RemoveCharacter(Item: CharacterClass) {

    let _PartyMemberID: string;

    for (var i = 0; i < this.PartyMembersList.length; i++) {
      if (this.PartyMembersList[i].CharacterID === Item._id) {
        _PartyMemberID = this.PartyMembersList[i]._id;
      } 
    }

    this.modalService
      .ShowConfirmation("Delete Confirmation", `Are you sure you want to remove this Character from this group?`)
      .subscribe(
        (result: boolean) => {
          if (result) {
            this.trackerService.PartyBusinessClass.DeletePartyMember(_PartyMemberID).subscribe(() => {
              this.utilityService.ShowSuccess(`Character was successfully revoved.`);
              this.CharacterList = [];
              this.GetStringOfIDsFromSelectedParty(this.SelectedPartyID);
            },
              (err: HttpErrorResponse) => {
                let ErrorMessage: string = this.utilityService.GetErrorMessageFromResponse(err);
                this.utilityService.ShowError(ErrorMessage);
              });
          }
        }
      );

  }

}
