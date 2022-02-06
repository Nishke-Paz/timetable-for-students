import {
    ChangeDetectionStrategy,
    Component, OnDestroy, OnInit,
} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { sttEmitter } from "./stt-emitters/stt-emitter";
import { Subject, takeUntil } from "rxjs";

@Component({
    selector: "stt-app-root",
    templateUrl: "./stt-app.component.html",
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SttAppComponent implements OnInit, OnDestroy{
    private ngUnsubscribe: Subject<boolean> = new Subject<boolean>();
    constructor(private httpClient: HttpClient) {
    }
    ngOnDestroy(): void{
        this.ngUnsubscribe.next(true);
        this.ngUnsubscribe.complete();
    }
    ngOnInit(): void{
        this.httpClient.get(("/api/user"), { withCredentials: true })
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe({ next: () => {
                sttEmitter.authEmitter.emit(false);
        },  error: () => {
                sttEmitter.authEmitter.emit(true);
        } });
    }
}
