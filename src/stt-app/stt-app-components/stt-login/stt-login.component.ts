import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SttAuthService } from "../../stt-services/stt-auth.service";
import { Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { sttEmitter } from "../../stt-emitters/stt-emitter";


@Component({
    selector: "stt-login",
    templateUrl: "./stt-login.component.html",
    styleUrls: ["./stt-login.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SttLoginComponent implements OnDestroy{
    emailError = false;
    passwordError = false;
    error: string | null = null;
    private ngUnsubscribe: Subject<boolean> = new Subject<boolean>();

    constructor(
        private sttAuthService: SttAuthService,
        private router: Router,
        private changeDetectorRef: ChangeDetectorRef,
        ) {
    }

    ngOnDestroy(): void{
        this.ngUnsubscribe.next(true);
        this.ngUnsubscribe.complete();
    }

    form: FormGroup = new FormGroup({
        email: new FormControl("", [Validators.required]),
        password: new FormControl("", [Validators.required]),
    });

    submit(): void {
        if (this.form.invalid){
            this.form.controls["email"].invalid ? this.emailError = true : this.emailError = false;
            this.form.controls["password"].invalid ? this.passwordError = true : this.passwordError = false;
        } else {
                this.sttAuthService.auth(this.form.getRawValue())
                    .pipe(takeUntil(this.ngUnsubscribe))
                    .subscribe({ next: () => {
                sttEmitter.authEmitter.emit(false);
                this.error = null;
                this.changeDetectorRef.markForCheck();
                this.router.navigate(["/admin"]);
            }, error: () => {
                this.error = "неверный email или пароль";
                this.changeDetectorRef.markForCheck();
            } });
        }
    }
}
