import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormStyle } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TrackerService } from '../shared/services/tracker.service';
import { ModalService } from "../shared/services/modal.service";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ModalService.GetModalList()
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    TrackerService,
    ModalService
  ],
  entryComponents: [
    ModalService.GetModalList()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

