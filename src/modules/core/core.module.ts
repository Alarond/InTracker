import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CoreFooterComponent } from "./footer/footer.component";
import { CoreHeaderComponent } from "./header/header.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        CoreFooterComponent,
        CoreHeaderComponent
    ],
    exports: [
        CoreFooterComponent,
        CoreHeaderComponent
    ],
    bootstrap: [],
    providers: []
})
export class PlatformToolsCoreModule { }