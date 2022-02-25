import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from "@angular/core";
import { SttGroupModel } from "../../stt-store/model/stt-group.model";
import { FormControl, Validators } from "@angular/forms";
import { map, Observable, startWith, takeUntil } from "rxjs";
import { SttTimetable } from "../../stt-store/state/stt-group.state";
import { loadGroup } from "../../stt-store/actions/stt-current-group.actions";
import { selectCurrentGroup } from "../../stt-store/selectors/stt-current-group.selector";
import { selectAllGroups } from "../../stt-store/selectors/stt-list-group.selector";
import { Store } from "@ngrx/store";
import { ActivatedRoute, Router } from "@angular/router";
import { RxUnsubscribeComponent } from "../../rx-unsubscribe";
import { selectGroupForAdmin } from "../../stt-store/selectors/stt-group-for-admin.selector";
import { loadGroupForAdmin } from "src/stt-app/stt-store/actions/stt-group-for-admin.actions";


@Component({
    selector: "stt-search-group",
    templateUrl: "./stt-search-group.component.html",
    styleUrls: ["./stt-search-group.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SttSearchGroupComponent extends RxUnsubscribeComponent implements OnInit{
    groups: SttGroupModel[];
    errorMessage: string = "";
    timetableControl = new FormControl("", [Validators.required]);
    filteredOptions: Observable<SttGroupModel[]>;
    panel: string;
    @Output() groupLoading = new EventEmitter<Observable<SttTimetable[]>>();
    @Output() titleLoading = new EventEmitter<string>();

    ngOnInit(): void{
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
        private activatedRoute: ActivatedRoute) {
        super();
        this.panel = this.activatedRoute.snapshot.url[0].path;
    }

    private _filter(name: string): SttGroupModel[] {
        const filterValue = name.toLowerCase();
        return this.groups.filter((option) => option.group.toLowerCase().includes(filterValue));
    }

    displayFn(group: SttGroupModel): string {
        return group?.group ? group.group : "";
    }

    onSubmit(): void{
        if (this.timetableControl.value?.["id"]){
            localStorage.setItem(`${this.panel}-panel-group`, this.timetableControl.value["group"]);
            localStorage.setItem(`${this.panel}-panel-id`, this.timetableControl.value["id"]);
            if (this.activatedRoute.snapshot.url[0].path === "admin"){
                this.store.dispatch(loadGroupForAdmin({ id: this.timetableControl.value["id"] }));
                this.titleLoading.emit(this.timetableControl.value["group"]);
                this.groupLoading.emit(this.store.select(selectGroupForAdmin));
            } else {
                this.store.dispatch(loadGroup({ id: this.timetableControl.value["id"] }));
                this.titleLoading.emit(this.timetableControl.value["group"]);
                this.groupLoading.emit(this.store.select(selectCurrentGroup));
            }
            this.router.navigate([`/${this.activatedRoute.snapshot.url[0].path}`],
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
