import { ComponentFactoryResolver, Injectable, ViewContainerRef } from "@angular/core";
import { Observable, Observer } from "rxjs";

import { CharacterAdderModal } from "../modals/character-adder/character-adder.modal";
import { CharacterSelectorModal } from "../modals/character-selector/character-selector.modal";
import { PartyAdderModal } from "../modals/party-adder/party-adder.modal";
import { ConfirmationModal } from '../modals/confirmation/confirmation.modal';
import { CharacterClass, PartyClass } from '../models';

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
            CharacterSelectorModal,
            PartyAdderModal,
            ConfirmationModal
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

  public ShowPartyAdderPicker(): Observable<PartyClass> {
    const factory = this.factoryResolver.resolveComponentFactory(PartyAdderModal);
    const component = factory.create(this.rootViewContainer.parentInjector);
    this.rootViewContainer.insert(component.hostView);

    let CurrentObserver: Observer<PartyClass> = null;

    let ModalObservable: Observable<PartyClass> = component.instance.Init();
    ModalObservable.subscribe((returnValue) => {
      let index: number = this.rootViewContainer.indexOf(component.hostView);
      this.rootViewContainer.remove(index);
      CurrentObserver.next(returnValue);
    });

    return new Observable<PartyClass>(
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

  public ShowConfirmation(title: string, subtitle: string): Observable<boolean> {

    const factory = this.factoryResolver.resolveComponentFactory(ConfirmationModal);
    const component = factory.create(this.rootViewContainer.parentInjector);
    this.rootViewContainer.insert(component.hostView);

    let CurrentObserver: Observer<boolean> = null;

    let ModalObservable: Observable<boolean> = component.instance.Init(title, subtitle);
    ModalObservable.subscribe((returnValue) => {
      let index: number = this.rootViewContainer.indexOf(component.hostView);
      this.rootViewContainer.remove(index);
      CurrentObserver.next(returnValue);
    });

    return new Observable<boolean>(
      observer => { CurrentObserver = observer; }
    );
  }

}
