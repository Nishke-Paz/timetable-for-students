import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import {  Observable, takeUntil } from "rxjs";
import { deleteLesson, loadGroupForAdmin } from "../../stt-store/actions/stt-group-for-admin.actions";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { SttGroupModel } from "../../stt-store/model/stt-group.model";
import { SttTimetable } from "../../stt-store/state/stt-group.state";
import { selectGroupForAdmin } from "../../stt-store/selectors/stt-group-for-admin.selector";
import { RxUnsubscribeComponent } from "../../rx-unsubscribe";
import { loadGroup } from "../../stt-store/actions/stt-current-group.actions";


@Component({
    selector: "stt-admin-panel",
    templateUrl: "./stt-admin-panel.component.html",
    styleUrls: ["./stt-admin-panel.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SttAdminPanelComponent extends RxUnsubscribeComponent implements OnInit{
    search = true;
    title: string = "Выбор группы для редактирования";
    groups: SttGroupModel[];
    currentGroup: Observable<SttTimetable[]>;
    constructor(
        private detectionStrategy: ChangeDetectorRef,
        private activatedRoute: ActivatedRoute,
        private store: Store) {
        super();
    }
    ngOnInit(): void{
        if (localStorage.getItem("admin-panel-id") &&
            this.activatedRoute.snapshot.queryParams.id &&
            (localStorage.getItem(`admin-panel-id`) !== this.activatedRoute.snapshot.queryParams.id)) {
            this.store.dispatch(loadGroupForAdmin({ id: this.activatedRoute.snapshot.queryParams.id }));
            this.store.select(selectGroupForAdmin).pipe(takeUntil(this.destroy$)).subscribe((data) => {
                if (data.length){
                    this.search = false;
                    this.title = data[0].group;
                    localStorage.setItem("admin-panel-group", data[0].group);
                    localStorage.setItem("admin-panel-id", String(data[0].id));
                    this.currentGroup = this.store.select(selectGroupForAdmin);
                }
            });
        } else if (localStorage.getItem("admin-panel-group")) {
            this.search = false;
            this.title = localStorage.getItem("admin-panel-group");
            this.currentGroup = this.store.select(selectGroupForAdmin);
        }
    }
    changeGroup(): void{
        this.search = true;
        this.title = "Выбор группы для редактирования";
        localStorage.removeItem("admin-panel-group");
        localStorage.removeItem("admin-panel-id");
    }
    groupLoading(data: Observable<SttTimetable[]>): void{
        this.currentGroup = data;
        this.search = false;
    }
    remove(id: number): void{
        this.store.dispatch(deleteLesson({ idLesson: id, idGroup: Number(localStorage.getItem("admin-panel-id")) }));
        this.currentGroup = this.store.select(selectGroupForAdmin);
        if (localStorage.getItem("admin-panel-group") === localStorage.getItem("user-panel-group")){
            this.store.dispatch(loadGroup({ id: Number(localStorage.getItem("user-panel-id")) }));
        }
    }
}
