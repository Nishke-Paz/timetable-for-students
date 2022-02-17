import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { map, Observable, startWith, takeUntil } from "rxjs";
import { selectAllGroups } from "../../stt-store/selectors/stt-list-group.selector";
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
    selector: "stt-search",
    templateUrl: "./stt-search.component.html",
    styleUrls: ["./stt-search.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SttSearchComponent extends RxUnsubscribeComponent implements OnInit{
    title: string = "Выберите группу";
    groups: SttGroupModel[];
    search: boolean = true;
    errorMessage: string = "";
    timetableControl = new FormControl("", [Validators.required]);
    filteredOptions: Observable<SttGroupModel[]>;
    currentGroup: Observable<SttTimetable[]>;

    ngOnInit(): void{
        if (this.cookie.get("id") &&
            this.activatedRoute.snapshot.queryParams.id &&
            (this.cookie.get("id") !== this.activatedRoute.snapshot.queryParams.id)) {
            this.store.dispatch(loadGroup({ id: this.activatedRoute.snapshot.queryParams.id }));
            this.store.select(selectCurrentGroup).pipe(takeUntil(this.destroy$)).subscribe((data) => {
                if (data.length){
                    this.search = false;
                    this.title = data[0].group;
                    this.changeDetectorRef.markForCheck();
                    this.cookie.set("group", data[0].group);
                    this.cookie.set("id", String(data[0].id));
                    this.currentGroup = this.store.select(selectCurrentGroup).pipe(takeUntil(this.destroy$));
                } else {
                    this.cookie.delete("group");
                    this.cookie.delete("id");
                    this.search = true;
                    this.title = "Выберите группу";
                    this.errorMessage = "расписание для данной группы не найдено";
                    setTimeout(() => {
                        this.errorMessage = "";
                        this.changeDetectorRef.markForCheck();
                    }, 3000);
                    this.router.navigate(["/search"]);
                }
            });
        } else if (this.cookie.get("group")) {
            this.search = false;
            this.title = this.cookie.get("group");
            this.changeDetectorRef.markForCheck();
            this.currentGroup = this.store.select(selectCurrentGroup).pipe(takeUntil(this.destroy$));
        }
        this.store.select(selectAllGroups).pipe(takeUntil(this.destroy$)).subscribe((data) => {
            this.groups = data;
            this.filteredOptions = this.timetableControl.valueChanges.pipe(
                startWith(""),
                map((value) => (typeof value === "string" ? value : value.name)),
                map((name) => (name ? this._filter(name) : [...data])),
            );
        });
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

    private _filter(name: string): SttGroupModel[] {
        const filterValue = name.toLowerCase();
        return this.groups.filter((option) => option.group.toLowerCase().includes(filterValue));
    }

    displayFn(group: SttGroupModel): string {
        return group?.group ? group.group : "";
    }

    changeGroup(): void{
        this.search = true;
        this.title = "Выберите группу";
        this.cookie.delete("group");
        this.cookie.delete("id");
        this.router.navigate(["/search"]);
    }

    onSubmit(): void{
        if (this.timetableControl.value?.["id"]){
            this.search = false;
            this.cookie.set("group", this.timetableControl.value["group"]);
            this.cookie.set("id", this.timetableControl.value["id"]);
            this.title = this.timetableControl.value["group"];
            this.store.dispatch(loadGroup({ id: this.timetableControl.value["id"] }));
            this.currentGroup = this.store.select(selectCurrentGroup).pipe(takeUntil(this.destroy$));
            this.router.navigate(["/search"],
                { queryParams: { id: this.timetableControl.value["id"] } });
        } else if (!this.timetableControl.errors) {
            this.errorMessage = "расписание для данной группы не найдено";
            setTimeout(() => {
                this.errorMessage = "";
                this.changeDetectorRef.markForCheck();
            }, 3000);
        }
    }
}
