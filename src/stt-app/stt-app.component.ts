import {
    ChangeDetectionStrategy,
    Component, OnInit,
} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { sttEmitter } from "./stt-emitters/stt-emitter";
import { takeUntil } from "rxjs";
import { RxUnsubscribeComponent } from "./rx-unsubscribe";
import { loadGroups } from "./stt-store/actions/stt-group-list.actions";
import { Store } from "@ngrx/store";
import { CookieService } from "ngx-cookie-service";
import { loadGroup } from "./stt-store/actions/stt-current-group.actions";

@Component({
    selector: "stt-app-root",
    templateUrl: "./stt-app.component.html",
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SttAppComponent extends RxUnsubscribeComponent implements OnInit{
    constructor(
        private httpClient: HttpClient,
        private store: Store,
        private cookie: CookieService) {
        super();
    }
    ngOnInit(): void{
        this.store.dispatch(loadGroups());
        if (this.cookie.check("group")){
            this.store.dispatch(loadGroup({ id: Number(this.cookie.get("id")) }));
        }
        this.httpClient.get(("/api/user"), { withCredentials: true })
            .pipe(takeUntil(this.destroy$))
            .subscribe({ next: () => {
                sttEmitter.authEmitter.emit(false);
        },  error: () => {
                sttEmitter.authEmitter.emit(true);
        } });
    }
}
