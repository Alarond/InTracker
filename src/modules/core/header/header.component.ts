import { Component, Input, OnInit } from "@angular/core";

import { CoreHeaderItemClass } from "./header.model";

@Component({
    selector: "core-header",
    templateUrl: "./header.component.html",
    styleUrls: ['./header.component.scss']
})
export class CoreHeaderComponent implements OnInit {

    @Input("applicationName")
    public ApplicationName: string;

    @Input("dataSource")
    public ItemList: CoreHeaderItemClass[];

    constructor() {

    }

    ngOnInit() {
    }
}
