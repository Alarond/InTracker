
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CharacterClass } from "../models";
//import { } from "../services/tracker.service";

export class CharacterBusinessClass {

  constructor(private WebServiceBaseURL: String, private http: HttpClient) { }

  GetSingleAsObject(CharacterID: string): Observable<CharacterClass> {
    return this.http.get<CharacterClass>(this.WebServiceBaseURL + `api/character/${CharacterID}`)
  }
  
  GetMultipleAsObject(): Observable<CharacterClass[]> {
    return this.http.get<CharacterClass[]>(this.WebServiceBaseURL + `api/character`)
  }

  GetMultibleAsObjectStringOfIDs(StringOfIDs: string): Observable<CharacterClass[]> {
    return this.http.get<CharacterClass[]>(this.WebServiceBaseURL + `api/character/bycharacterids/${StringOfIDs}`)
  }

  AddCharacter(Item: CharacterClass) {
    return this.http.post(this.WebServiceBaseURL + `api/character`, Item);
  }

  UpdateCharacter(Item: CharacterClass) {
    let CharacterID: string = Item._id;
    return this.http.put(this.WebServiceBaseURL + `api/character/${CharacterID}`, Item);
  }

  DeleteCharacter(CharacterID: string) {
    return this.http.delete(this.WebServiceBaseURL + `api/character/${CharacterID}`);
  }

}
