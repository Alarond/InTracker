import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable, Observer } from "rxjs";

import { CharacterClass } from "../../models";

@Component({
  templateUrl: "./character-adder.modal.html",
  styleUrls: ["./character-adder.modal.scss"]
})
export class CharacterAdderModal implements OnInit {

    public CurrentForm: FormGroup = null;
    private _NameCountrol: FormControl;
    private _SpeedCountrol: FormControl;
    private _DexCountrol: FormControl;
    private _NumberToAddControl: FormControl;

    private Observer: Observer<CharacterClass>;

    public CharacterList: CharacterClass[];

    constructor(private cd: ChangeDetectorRef) {

        this._NameCountrol = new FormControl(null, [Validators.required]);
        this._SpeedCountrol = new FormControl(null, [Validators.required]);
        this._DexCountrol = new FormControl(null, [Validators.required]);
        this._NumberToAddControl = new FormControl(1, [Validators.required]);

        this.CurrentForm = new FormGroup({
          Name: this._NameCountrol,
          Speed: this._SpeedCountrol,
          Dex: this._DexCountrol,
          NoToAdd: this._NumberToAddControl
        });

    }

    ngOnInit(): void {
    }
    
    Init(): Observable<CharacterClass> {
        return new Observable<CharacterClass>(
            observer => { this.Observer = observer; }
        );
    }

    Close() {
        if (this.Observer) {
            this.Observer.next(null);
        }
    }

    Confirm() {
        if (this._NameCountrol.value === "") {
            return;
        }
        if (this._SpeedCountrol.value === "") {
          return;
        }
        if (this._DexCountrol.value === "") {
          return;
        }
        if (this._NumberToAddControl.value === "") {
          return;
        }

      let SelectedItem: CharacterClass = this.CurrentForm.value; 

        //console.log(SelectedItem);

        if (this.Observer) {
            this.Observer.next(SelectedItem);
        }
    }
}
