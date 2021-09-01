import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable, Observer } from "rxjs";
import { TrackerService } from '../../services/tracker.service';

import { CharacterClass } from "../../models";

@Component({
  templateUrl: "./character-selector.modal.html",
  styleUrls: ["./character-selector.modal.scss"]
})
export class CharacterSelectorModal implements OnInit {

    public CurrentForm: FormGroup = null;
    private _NameCountrol: FormControl;
    private _NumberToAddControl: FormControl;

    private Observer: Observer<CharacterClass>;

    public CharacterList: CharacterClass[];

  constructor(private cd: ChangeDetectorRef, private trackerService: TrackerService) {

      this._NameCountrol = new FormControl(null);
      this._NumberToAddControl = new FormControl(1, [Validators.required]);
      //this._NameCountrol = new FormControl(null, [Validators.required]);

      this.CurrentForm = new FormGroup({
        NameCountrol: this._NameCountrol,
        NoToAdd: this._NumberToAddControl
      });

    }

    ngOnInit(): void {
      this.GetAllCharacters();
    }
    
    Init(): Observable<CharacterClass> {
        return new Observable<CharacterClass>(
            observer => { this.Observer = observer; }
        );
    }


    private GetAllCharacters() {
      this.trackerService.CharacterBusinessClass.GetMultipleAsObject().subscribe(
        (data: CharacterClass[]) => {
          this.CharacterList = data;
          this.CharacterList.sort((a, b) => a.Name.localeCompare(b.Name));
        }
      );
    }

    Close() {
        if (this.Observer) {
            this.Observer.next(null);
        }
    }

    Confirm() {
        if (this._NameCountrol.value === null) {
          return;
        }
        if (this._NumberToAddControl.value === "") {
          return;
        }

        let SelectedItem: CharacterClass = this.CharacterList.find(x => x.Name === this._NameCountrol.value);
        SelectedItem.NoToAdd = this._NumberToAddControl.value;

        if (this.Observer) {
          this.Observer.next(SelectedItem);
        }
    }
}
