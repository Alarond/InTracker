import { Component } from "@angular/core";
import { Observable, Observer } from "rxjs";

@Component({
    templateUrl: "./confirmation.modal.html",
    styleUrls: ["./confirmation.modal.scss"]
})
export class ConfirmationModal {

    public TitleText: string;
    public MessageText: string;

    private Observer: Observer<boolean>;

    Init(title: string, message: string): Observable<boolean> {
        this.TitleText = title;
        this.MessageText = message;

        return new Observable<boolean>(
            observer => { this.Observer = observer; }
        );
    }

    Close() {
        if (this.Observer) {
            this.Observer.next(false);
        }
    }

    Confirm() {
        if (this.Observer) {
            this.Observer.next(true);
        }
    }
}