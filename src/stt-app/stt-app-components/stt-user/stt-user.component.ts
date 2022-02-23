import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Observable, takeUntil } from "rxjs";
import { Store } from "@ngrx/store";
import { ActivatedRoute, Router } from "@angular/router";
import { RxUnsubscribeComponent } from "../../rx-unsubscribe";
import { HttpClient } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { selectCurrentGroup } from "../../stt-store/selectors/stt-current-group.selector";
import { SttTimetable } from "../../stt-store/state/stt-group.state";
import { loadGroup } from "../../stt-store/actions/stt-current-group.actions";
import { SttGroupModel } from "../../stt-store/model/stt-group.model";

@Component({
    selector: "stt-user",
    templateUrl: "./stt-user.component.html",
    styleUrls: ["./stt-user.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SttUserComponent extends RxUnsubscribeComponent implements OnInit{
    title: string = "Выберите группу";
    groups: SttGroupModel[];
    search: boolean = true;
    errorMessage: string = "";
    currentGroup: Observable<SttTimetable[]>;

    ngOnInit(): void{
        if (this.cookie.get("user-panel-id") &&
            this.activatedRoute.snapshot.queryParams.id &&
            (this.cookie.get("user-panel-id") !== this.activatedRoute.snapshot.queryParams.id)) {
            this.store.dispatch(loadGroup({ id: this.activatedRoute.snapshot.queryParams.id }));
            this.store.select(selectCurrentGroup).pipe(takeUntil(this.destroy$)).subscribe((data) => {
                if (data.length){
                    this.search = false;
                    this.title = data[0].group;
                    this.changeDetectorRef.markForCheck();
                    this.cookie.set("user-panel-group", data[0].group);
                    this.cookie.set("user-panel-id", String(data[0].id));
                    this.currentGroup = this.store.select(selectCurrentGroup).pipe(takeUntil(this.destroy$));
                } else {
                    this.cookie.delete("user-panel-group");
                    this.cookie.delete("user-panel-id");
                    this.search = true;
                    this.title = "Выберите группу";
                    this.errorMessage = "расписание для данной группы не найдено";
                    setTimeout(() => {
                        this.errorMessage = "";
                        this.changeDetectorRef.markForCheck();
                    }, 3000);
                    this.router.navigate(["/user"]);
                }
            });
        } else if (this.cookie.get("user-panel-group")) {
            this.search = false;
            this.title = this.cookie.get("user-panel-group");
            this.changeDetectorRef.markForCheck();
            this.currentGroup = this.store.select(selectCurrentGroup).pipe(takeUntil(this.destroy$));
        }
    }

    constructor(
        private store: Store,
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private httpClient: HttpClient,
        private cookie: CookieService) {
        super();
    }
    changeGroup(): void{
        this.search = true;
        this.title = "Выберите группу";
        this.cookie.delete("user-panel-group");
        this.cookie.delete("user-panel-id");
        this.router.navigate(["/user"]);
    }
    loadGroup(data: Observable<SttTimetable[]>): void{
        this.search = false;
        this.currentGroup = data;
    }
    loadTitle(data: string): void{
        this.title = data;
    }
}
