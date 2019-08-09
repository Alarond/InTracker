
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PartyClass, PartyMembersClass } from "../models";
//import { } from "../services/tracker.service";

export class PartyBusinessClass {

  constructor(private WebServiceBaseURL: String, private http: HttpClient) { }

  //Party and Group are the same.
  //TODO: Change Group on API to Party

  GetSingleAsObject(GroupID: string): Observable<PartyClass> {
    return this.http.get<PartyClass>(this.WebServiceBaseURL + `api/group/${GroupID}`)
  }
  
  GetMultipleAsObject(): Observable<PartyClass[]> {
    return this.http.get<PartyClass[]>(this.WebServiceBaseURL + `api/group`)
  }

  AddCharacter(Item: PartyClass) {
    return this.http.post(this.WebServiceBaseURL + `api/group`, Item);
  }

  //This section is for teh Party Members list, Add, remove

  GetMultiplePartyMembersAsObject(GroupID: string): Observable<PartyMembersClass[]> {
    return this.http.get<PartyMembersClass[]>(this.WebServiceBaseURL + `api/partymember/bygroupid/${GroupID}`)
  }

  //TODO:  Enable these Classes below in API Service

  //UpdateCharacter(Item: PartyClass) {
  //}
  //  return this.http.put(this.WebServiceBaseURL + `api/group`, Item);

  //DeleteCharacter(GroupID: string) {
  //  return this.http.delete(this.WebServiceBaseURL + `api/group/${GroupID}`);
  //}

  //DeletePartyMember(PartymemberID: string) {
  //  return this.http.delete(this.WebServiceBaseURL + `api/partymember/${PartymemberID}`);
  //}

}
