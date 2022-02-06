import { Injectable } from "@angular/core";

import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { SttAuthService } from "../stt-services/stt-auth.service";

@Injectable({
    providedIn: "root"
})
export class SttAuthResolver implements Resolve<unknown> {
    constructor(private sttAuthService: SttAuthService) {
    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<unknown>{
        return this.sttAuthService.user();
    }
}
