import { Component, OnInit } from '@angular/core';
import { CharacterClass } from '../../shared/models';
import { TrackerService } from '../../shared/services/tracker.service';
import { ModalService } from '../../shared/services/modal.service';
import { UtilityService } from '../../shared/services/utility.service';
import { HttpErrorResponse } from '@angular/common/http';

//import * as heroData from '../../data/superheroes.json'

@Component({
  selector: 'app-main',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  public CharacterList: CharacterClass[];
  
  //vars for adding new characters
  public _id: string;
  public Name: string = "";
  public Speed: number = 2;
  public Dex: number = 10;

  constructor(
    private trackerService: TrackerService,
    private modalService: ModalService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.GetAllCharacters();
  }

  //Database functions

  private GetAllCharacters() {
    this.trackerService.CharacterBusinessClass.GetMultipleAsObject().subscribe(
      (data: CharacterClass[]) => {
        this.CharacterList = data;
        this.CharacterList.sort((a, b) => a.Name.localeCompare(b.Name));
      }
    );
  }

  addNewCharacter() {

    //this function is be called to add aditional characters from the DOM
    this.modalService.ShowCharacterAdderPicker().subscribe((selectedCharacter: CharacterClass) => {

      if (selectedCharacter) {

        //TODO: Call Update Character function
        this.trackerService.CharacterBusinessClass.AddCharacter(selectedCharacter)
          .subscribe(() => {
            this.utilityService.ShowSuccess("The Character was successfully Added");
            this.CharacterList = [];
            this.GetAllCharacters();
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

  UpdateCharacter(Item: CharacterClass) {

    let ValidationErrorMessage: string;

    if (Item.Name === "") {
      ValidationErrorMessage = "Name is a Required Field "
    }

    if (Item.Dex === null) {
      ValidationErrorMessage = "Dex is a Required Field "
    }

    if (Item.Speed === null) {
      ValidationErrorMessage = "Speed is a Required Field "
    }

    if (ValidationErrorMessage) {
      this.utilityService.ShowError(ValidationErrorMessage);
      return
    }

    this.trackerService.CharacterBusinessClass.UpdateCharacter(Item)
      .subscribe(() => {
        this.utilityService.ShowSuccess("The Character was successfully Updated");
        this.CharacterList = [];
        this.GetAllCharacters();
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

  DeleteCharacter(Item: CharacterClass) {

    this.modalService
      .ShowConfirmation("Delete Confirmation", `Are you sure you want to delete '${Item.Name}'?`)
      .subscribe(
        (result: boolean) => {
          if (result) {
            this.trackerService.CharacterBusinessClass.DeleteCharacter(Item._id).subscribe(() => {
              this.utilityService.ShowSuccess(`'${Item.Name}' was successfully deleted.`);
              this.CharacterList = [];
              this.GetAllCharacters();
            },
              (err: HttpErrorResponse) => {
                let ErrorMessage: string = this.utilityService.GetErrorMessageFromResponse(err);
                this.utilityService.ShowError(ErrorMessage);
              });
          }
        }
    );

  }

  //helper functions section

}
