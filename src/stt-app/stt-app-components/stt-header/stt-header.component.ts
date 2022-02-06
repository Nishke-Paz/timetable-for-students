import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { SttAuthService } from "../../stt-services/stt-auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { sttEmitter } from "../../stt-emitters/stt-emitter";
import { Subject, takeUntil } from "rxjs";


@Component({
    selector: "stt-header",
    templateUrl: "./stt-header.component.html",
    styleUrls: ["./stt-header.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SttHeaderComponent implements OnInit, OnDestroy{
    login: boolean = false;
    private ngUnsubscribe: Subject<boolean> = new Subject<boolean>();
    constructor(
        private sttAuthService: SttAuthService,
        private activatedRouteSnapshot: ActivatedRoute,
        private router: Router,
        private changeDetectorRef: ChangeDetectorRef,
    ) {
    }

    ngOnDestroy(): void{
        this.ngUnsubscribe.next(true);
        this.ngUnsubscribe.complete();
    }

    ngOnInit(): void{
        sttEmitter.authEmitter.pipe(takeUntil(this.ngUnsubscribe)).subscribe((auth) => {
            this.login = auth;
            this.changeDetectorRef.markForCheck();
        });
    }

    logout(): void{
        sttEmitter.authEmitter.emit(true);
        this.sttAuthService.logout();
    }
    onAdminPanel(): void{
        this.sttAuthService.user().pipe(takeUntil(this.ngUnsubscribe)).subscribe({ next: () => {
            this.router.navigate(["/admin"]);
        }, error: () => {
            this.router.navigate(["/login"]);
        } });
    }
}
