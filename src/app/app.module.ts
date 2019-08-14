import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { PlatformToolsCoreModule } from "../modules/core/core.module"; 

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormStyle } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

//services
import { TrackerService } from '../shared/services/tracker.service';
import { ModalService } from "../shared/services/modal.service"; 
import { UtilityService } from "../shared/services/utility.service";

//components
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { CharacterComponent } from './character/character.component';
import { PartyComponent } from './party/party.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterComponent,
    MainComponent,
    PartyComponent,
    ModalService.GetModalList()
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot(),
    PlatformToolsCoreModule,
    ReactiveFormsModule
  ],
  providers: [
    TrackerService,
    ModalService,
    UtilityService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  entryComponents: [
    ModalService.GetModalList()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

