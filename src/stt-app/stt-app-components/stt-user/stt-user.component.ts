import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Observable, takeUntil } from "rxjs";
import { Store } from "@ngrx/store";
import { ActivatedRoute, Router } from "@angular/router";
import { RxUnsubscribeComponent } from "../../rx-unsubscribe";
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
        if (localStorage.getItem("user-panel-id") &&
            this.activatedRoute.snapshot.queryParams.id &&
            (localStorage.getItem("user-panel-id") !== this.activatedRoute.snapshot.queryParams.id)) {
            this.store.dispatch(loadGroup({ id: this.activatedRoute.snapshot.queryParams.id }));
            this.store.select(selectCurrentGroup).pipe(takeUntil(this.destroy$)).subscribe((data) => {
                if (data.length){
                    this.search = false;
                    this.title = data[0].group;
                    this.changeDetectorRef.markForCheck();
                    localStorage.setItem("user-panel-group", data[0].group);
                    localStorage.setItem("user-panel-id", String(data[0].id));
                    this.currentGroup = this.store.select(selectCurrentGroup).pipe(takeUntil(this.destroy$));
                }
            });
        } else if (localStorage.getItem("user-panel-group")) {
            this.search = false;
            this.title = localStorage.getItem("user-panel-group");
            this.changeDetectorRef.markForCheck();
            this.currentGroup = this.store.select(selectCurrentGroup).pipe(takeUntil(this.destroy$));
        }
    }

    constructor(
        private store: Store,
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router,
        private activatedRoute: ActivatedRoute) {
        super();
    }
    changeGroup(): void{
        this.search = true;
        this.title = "Выберите группу";
        localStorage.removeItem("user-panel-group");
        localStorage.removeItem("user-panel-id");
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
