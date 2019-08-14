import { Component, Inject, OnInit, ViewContainerRef } from '@angular/core';
import { ModalService } from "../shared/services/modal.service";
import { Router } from "@angular/router";

import { CoreHeaderItemClass } from "../modules/core";

import { environment } from "../data/environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

 
export class AppComponent {

  public ItemList: CoreHeaderItemClass[];
  public BuildNumber: string = environment.BuildNumber;
  title = 'InTracker';

  constructor(
    private modalService: ModalService, private router: Router,
    @Inject(ViewContainerRef) viewContainerRef)
    {
      this.modalService.SetRootViewContainerReference(viewContainerRef);
    }

  private InitializeHeader() {
    this.ItemList = new Array<CoreHeaderItemClass>();
    this.ItemList.push(CoreHeaderItemClass.CreateDestinationURL("Home ", "#"));
    this.ItemList.push(CoreHeaderItemClass.CreateDestinationURL("Characters ", "#/character"));
    this.ItemList.push(CoreHeaderItemClass.CreateDestinationURL("Parties ", "#/party"));
    console.log(this.ItemList);
  }

  ngOnInit() {
    this.InitializeHeader();
  }

  public OnActivate() {
    window.scrollTo(0, 0);
  }

}

