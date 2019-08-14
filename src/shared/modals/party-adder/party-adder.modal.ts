import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable, Observer } from "rxjs";

import { PartyClass } from "../../models";

@Component({
  templateUrl: "./party-adder.modal.html",
  styleUrls: ["./party-adder.modal.scss"]
})
export class PartyAdderModal implements OnInit {

    public CurrentForm: FormGroup = null;
    private _NameCountrol: FormControl;

  private Observer: Observer<PartyClass>;

  public PartyList: PartyClass[];

    constructor(private cd: ChangeDetectorRef) {

        this._NameCountrol = new FormControl(null, [Validators.required]);

        this.CurrentForm = new FormGroup({
          GroupName: this._NameCountrol
        });

    }

    ngOnInit(): void {
    }
    
    Init(): Observable<PartyClass> {
        return new Observable<PartyClass>(
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

      let SelectedItem: PartyClass = this.CurrentForm.value; 

        console.log(SelectedItem);

        if (this.Observer) {
            this.Observer.next(SelectedItem);
        }
    }
}
