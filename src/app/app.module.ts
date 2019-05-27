import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';
import { FormStyle } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TrackerService } from '../shared/services/tracker.service'

@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    TrackerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

