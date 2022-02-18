import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { sttEmitter } from "../stt-emitters/stt-emitter";
import { SttAuthService } from "../stt-services/stt-auth.service";


@Injectable({
    providedIn: "root"
})
export class SttLogoutResolver implements Resolve<boolean>{
    constructor(private sttAuthService: SttAuthService) {
    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        sttEmitter.authEmitter.emit(true);
        this.sttAuthService.logout();
        return true;
    }
}
