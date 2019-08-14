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

    private Observer: Observer<CharacterClass>;

    public CharacterList: CharacterClass[];

  constructor(private cd: ChangeDetectorRef, private trackerService: TrackerService) {

      this._NameCountrol = new FormControl(null);
      //this._NameCountrol = new FormControl(null, [Validators.required]);

      this.CurrentForm = new FormGroup({
        NameCountrol: this._NameCountrol
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

        let SelectedItem: CharacterClass = this.CharacterList.find(x => x.Name === this._NameCountrol.value);

        if (this.Observer) {
          this.Observer.next(SelectedItem);
        }
    }
}
