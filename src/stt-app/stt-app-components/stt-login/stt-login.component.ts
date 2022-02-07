import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SttAuthService } from "../../stt-services/stt-auth.service";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { sttEmitter } from "../../stt-emitters/stt-emitter";
import { RxUnsubscribeComponent } from "../../rx-unsubscribe";


@Component({
    selector: "stt-login",
    templateUrl: "./stt-login.component.html",
    styleUrls: ["./stt-login.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SttLoginComponent extends RxUnsubscribeComponent{
    emailError = false;
    passwordError = false;
    error: string | null = null;

    constructor(
        private sttAuthService: SttAuthService,
        private router: Router,
        private changeDetectorRef: ChangeDetectorRef,
        ) {
        super();
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
                    .pipe(takeUntil(this.destroy$))
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
