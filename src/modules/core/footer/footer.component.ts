import { Component, Input } from "@angular/core";

@Component({
    selector: "core-footer",
    templateUrl: "./footer.component.html",
    styleUrls: ["./footer.component.scss"]
})
export class CoreFooterComponent {

    @Input("buildNumber")
    public BuildNumber: string;

    @Input("informationClassification")
    public InformationClassification: string;

    constructor() {

    }
}