import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { CharacterComponent } from './character/character.component';
import { PartyComponent } from './party/party.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    data: { title: 'Main Page' }
  },
  {
    path: "character/:CharacterID",
    component: CharacterComponent
  },
  {
    path: "character",
    component: CharacterComponent
  },
  {
    path: "party",
    component: PartyComponent
  },
  {
    path: "party/:GroupID",
    component: PartyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
