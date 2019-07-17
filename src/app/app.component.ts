import { Component, Inject, ViewContainerRef } from '@angular/core';
import { ModalService } from "../shared/services/modal.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

 
export class AppComponent {
  title = 'InTracker';

  constructor(
    private modalService: ModalService,
    @Inject(ViewContainerRef) viewContainerRef)
  {
    this.modalService.SetRootViewContainerReference(viewContainerRef);
  }

}

