import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";

import { ToastrService } from "ngx-toastr";

@Injectable()
export class UtilityService {

    constructor(private toastr: ToastrService) { }

    public ShowSuccess(message: string) {
        this.toastr.success(message);
    }

    public ShowError(message: string) {
        if (message != undefined && message.length > 0) {
            this.toastr.error(message);
        } else {
            this.toastr.error("An error has occured, if this continues to occur please contact the tool administrator");
        }
    }
    
    public IsErrorListResponse(response: HttpErrorResponse) {
        if (response.status === 400) {
            if (response.error != undefined && response.error.ModelState != undefined) {
                return true;
            }
        }

        return false;
    }

    public CopyErrorListIntoFormGroup(response: HttpErrorResponse, currentForm: FormGroup) {
        let ModelState = response.error.ModelState;

        for (var key of Object.keys(ModelState)) {
            currentForm.controls[key].setErrors({ ServerSideValidationMessageArray: ModelState[key] });
        }
    }

    public GetErrorMessageFromResponse(response) {
        if (response.error.Message != undefined) {
            return response.error.Message;
        }

        return "";
    }

    public GetGotoFqdn(GotoAliasName: string) {

        let ProtocolTxt: string = window.location.protocol;

        let HostTxt: string = window.location.hostname;

        if (HostTxt.indexOf(".intel.com") === -1) {
            HostTxt = HostTxt + ".intel.com";
        }

        return ProtocolTxt + "//" + HostTxt + "/" + GotoAliasName;
    }
}