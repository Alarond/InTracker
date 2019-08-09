import { ComponentFactoryResolver, Injectable, ViewContainerRef } from "@angular/core";
import { Observable, Observer } from "rxjs";

import { CharacterAdderModal } from "../modals/character-adder/character-adder.modal";
import { CharacterSelectorModal } from "../modals/character-selector/character-selector.modal";
import { CharacterClass } from '../models';

@Injectable({ providedIn: "root" })
export class ModalService {
    private factoryResolver: ComponentFactoryResolver;
    private rootViewContainer: ViewContainerRef;

    constructor(componentFactoryResolver: ComponentFactoryResolver) {
        this.factoryResolver = componentFactoryResolver;
    }

    public static GetModalList(): any[] {
        return [
            CharacterAdderModal,
            CharacterSelectorModal
        ];
    }

    public SetRootViewContainerReference(viewContainerRef): void {
        this.rootViewContainer = viewContainerRef;
    }

    public ShowCharacterAdderPicker(): Observable<CharacterClass> {
        const factory = this.factoryResolver.resolveComponentFactory(CharacterAdderModal);
        const component = factory.create(this.rootViewContainer.parentInjector);
        this.rootViewContainer.insert(component.hostView);

      let CurrentObserver: Observer<CharacterClass> = null;

      let ModalObservable: Observable<CharacterClass> = component.instance.Init();
        ModalObservable.subscribe((returnValue) => {
            let index: number = this.rootViewContainer.indexOf(component.hostView);
            this.rootViewContainer.remove(index);
            CurrentObserver.next(returnValue);
        });

      return new Observable<CharacterClass>(
            observer => { CurrentObserver = observer; }
        );
  }

  public ShowCharacterSelectorPicker(): Observable<CharacterClass> {
      const factory = this.factoryResolver.resolveComponentFactory(CharacterSelectorModal);
      const component = factory.create(this.rootViewContainer.parentInjector);
      this.rootViewContainer.insert(component.hostView);

      let CurrentObserver: Observer<CharacterClass> = null;

      let ModalObservable: Observable<CharacterClass> = component.instance.Init();
      ModalObservable.subscribe((returnValue) => {
          let index: number = this.rootViewContainer.indexOf(component.hostView);
          this.rootViewContainer.remove(index);
          CurrentObserver.next(returnValue);
      });

      return new Observable<CharacterClass>(
          observer => { CurrentObserver = observer; }
      );
  }

}
