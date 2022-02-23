import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { SttAuthService } from "../../stt-services/stt-auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { sttEmitter } from "../../stt-emitters/stt-emitter";
import { takeUntil } from "rxjs";
import { RxUnsubscribeComponent } from "../../rx-unsubscribe";
import { CookieService } from "ngx-cookie-service";


@Component({
    selector: "stt-header",
    templateUrl: "./stt-header.component.html",
    styleUrls: ["./stt-header.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SttHeaderComponent extends RxUnsubscribeComponent implements OnInit{
    login: boolean = true;
    constructor(
        private sttAuthService: SttAuthService,
        private activatedRouteSnapshot: ActivatedRoute,
        private router: Router,
        private changeDetectorRef: ChangeDetectorRef,
        private cookie: CookieService,
    ) {
        super();
    }
    onUserPanel(): void{
        if (this.cookie.check("user-panel-id")){
            this.router.navigate(["/user"], { queryParams: { id: this.cookie.get("user-panel-id") } });
        } else {
            this.router.navigate(["/user"]);
        }
    }
    ngOnInit(): void{
        sttEmitter.authEmitter.pipe(takeUntil(this.destroy$)).subscribe((auth) => {
            this.login = auth;
            this.changeDetectorRef.markForCheck();
        });
    }
    onAdminPanel(): void{
        this.sttAuthService.user().pipe(takeUntil(this.destroy$)).subscribe({ next: () => {
            if (this.cookie.check("admin-panel-id")){
                this.router.navigate(["/admin"], { queryParams: { id: this.cookie.get("admin-panel-id") } });
            } else {
                this.router.navigate(["/admin"]);
            }
        }, error: () => {
            this.router.navigate(["/login"]);
        } });
    }
}
