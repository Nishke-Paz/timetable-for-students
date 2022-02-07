import {
    ChangeDetectionStrategy,
    Component, OnInit,
} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { sttEmitter } from "./stt-emitters/stt-emitter";
import { takeUntil } from "rxjs";
import { RxUnsubscribeComponent } from "./rx-unsubscribe";

@Component({
    selector: "stt-app-root",
    templateUrl: "./stt-app.component.html",
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SttAppComponent extends RxUnsubscribeComponent implements OnInit{
    constructor(private httpClient: HttpClient) {
        super();
    }
    ngOnInit(): void{
        this.httpClient.get(("/api/user"), { withCredentials: true })
            .pipe(takeUntil(this.destroy$))
            .subscribe({ next: () => {
                sttEmitter.authEmitter.emit(false);
        },  error: () => {
                sttEmitter.authEmitter.emit(true);
        } });
    }
}
