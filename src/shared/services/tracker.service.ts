import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../data/environments/environment";

//import refferences to the business classes here
import { CharacterBusinessClass } from "../buisiness/character.business";
import { PartyBusinessClass } from "../buisiness/party.business";

@Injectable()
export class TrackerService {

  constructor(private http: HttpClient) { }

  public CharacterBusinessClass: CharacterBusinessClass = new CharacterBusinessClass(environment.InTrackerAPIServiceURL, this.http);
  public PartyBusinessClass: PartyBusinessClass = new PartyBusinessClass(environment.InTrackerAPIServiceURL, this.http);

}
