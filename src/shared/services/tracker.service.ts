import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

//import refferences to the business classes here
import { CharacterBusinessClass } from "../buisiness/character.business";

import { } from "../buisiness/character.business";

@Injectable()
export class TrackerService {

  constructor(private http: HttpClient) { }

  public CharacterBusinessClass: CharacterBusinessClass = new CharacterBusinessClass(environment.InTrackerAPIServiceURL, this.http);

}
