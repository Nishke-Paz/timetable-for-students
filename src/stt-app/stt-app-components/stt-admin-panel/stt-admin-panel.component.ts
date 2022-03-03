import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { firstValueFrom, Observable, takeUntil } from "rxjs";
import { deleteLesson, loadGroupForAdmin } from "../../stt-store/actions/stt-group-for-admin.actions";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { SttGroupModel } from "../../stt-store/model/stt-group.model";
import { SttTimetable } from "../../stt-store/state/stt-group.state";
import { selectGroupForAdmin } from "../../stt-store/selectors/stt-group-for-admin.selector";
import { RxUnsubscribeComponent } from "../../rx-unsubscribe";
import { loadGroup } from "../../stt-store/actions/stt-current-group.actions";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SttServerService } from "../../stt-services/stt-server.service";
import { loadGroups } from "../../stt-store/actions/stt-group-list.actions";
import { HttpClient } from "@angular/common/http";


@Component({
    selector: "stt-admin-panel",
    templateUrl: "./stt-admin-panel.component.html",
    styleUrls: ["./stt-admin-panel.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SttAdminPanelComponent extends RxUnsubscribeComponent implements OnInit{
    search: boolean = false;
    showTable: boolean = false;
    addGroup: boolean = false;
    addLesson: boolean = false;
    errorText: string = "";
    feedback: string = "";
    addControl = new FormControl("", [Validators.required]);
    model = new FormGroup({
        name: new FormControl("", [Validators.required]),
        date: new FormControl("monday", [Validators.required]),
        numberLesson: new FormControl("1 пара", [Validators.required]),
        lectureHall: new FormControl("", [Validators.required]),
        teacher: new FormControl("", [Validators.required]),
        lessonType: new FormControl("", [Validators.required]),
    });
    title: string = "Выберите действие";
    groups: SttGroupModel[];
    currentGroup: Observable<SttTimetable[]>;
    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private activatedRoute: ActivatedRoute,
        private store: Store,
        private sttServerService: SttServerService,
        private router: Router,
        private http: HttpClient) {
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
                    this.showTable = true;
                    this.title = data[0].group;
                    localStorage.setItem("admin-panel-group", data[0].group);
                    localStorage.setItem("admin-panel-id", String(data[0].id));
                    this.currentGroup = this.store.select(selectGroupForAdmin);
                }
            });
        } else if (localStorage.getItem("admin-panel-group")) {
            this.search = false;
            this.showTable = true;
            this.title = localStorage.getItem("admin-panel-group");
            this.currentGroup = this.store.select(selectGroupForAdmin);
        }
    }
    changeAction(): void{
        this.title = "Выберите действие";
        this.showTable = false;
        this.addGroup = false;
        this.search = false;
        localStorage.removeItem("admin-panel-group");
        localStorage.removeItem("admin-panel-id");
        this.router.navigate(["/admin"]);
    }
    groupLoading(data: Observable<SttTimetable[]>): void{
        this.currentGroup = data;
        this.search = false;
        this.showTable = true;
    }
    remove(id: number): void{
        this.store.dispatch(deleteLesson({ idLesson: id, idGroup: Number(localStorage.getItem("admin-panel-id")) }));
        this.currentGroup = this.store.select(selectGroupForAdmin);
        if (localStorage.getItem("user-panel-id") === localStorage.getItem("admin-panel-id")){
            this.store.dispatch(loadGroup({ id: Number(localStorage.getItem("user-panel-id")) }));
        }
    }
    close(): void{
        this.addLesson = false;
        this.errorText = "";
        this.model.controls.name.reset();
        this.model.controls.teacher.reset();
        this.model.controls.lectureHall.reset();
        this.model.controls.lessonType.reset();
    }
    addNewGroup(): void{
        if (!this.addControl.errors) {
            this.sttServerService.createGroup(this.addControl.value)
                .pipe(takeUntil(this.destroy$))
                .subscribe((data) => {
                    this.store.dispatch(loadGroupForAdmin({ id: data.id }));
                    this.currentGroup = this.store.select(selectGroupForAdmin);
                    this.title = data.group;
                    localStorage.setItem("admin-panel-group", data.group);
                    localStorage.setItem("admin-panel-id", String(data.id));
                    this.changeDetectorRef.markForCheck();
                });
            this.store.dispatch(loadGroups());
            this.showTable = true;
            this.addGroup = false;
            this.addControl.reset();
        }
    }
    async onSubmit(): Promise<void>{
        this.errorText = "";
        let id: number;
        if (this.model.valid) {
            await firstValueFrom(this.store.select(selectGroupForAdmin))
                .then((data) => {
                    id = data[0].id;
                    for (const item of (data[0][`${this.model.controls.date.value}`])){
                        if (item.time === this.model.controls.numberLesson.value){
                            this.errorText = "В данную эту и время уже есть занятие";
                        }
                    }
                });
            if (!this.errorText){
                this.sttServerService.addTimetable({
                    subject: this.model.controls.name.value,
                    typeLesson: this.model.controls.lessonType.value,
                    teacher: this.model.controls.teacher.value,
                    lectureHall: this.model.controls.lectureHall.value,
                    time: this.model.controls.numberLesson.value
                }, id, this.model.controls.date.value).pipe(takeUntil(this.destroy$)).subscribe(() => {
                    this.store.dispatch(loadGroupForAdmin(
                        { id: Number(localStorage.getItem("admin-panel-id")) },
                    ));
                    this.currentGroup = this.store.select(selectGroupForAdmin);
                    if (localStorage.getItem("user-panel-id") === localStorage.getItem("admin-panel-id")){
                        this.store.dispatch(loadGroup({ id: Number(localStorage.getItem("user-panel-id")) }));
                    }
                    this.feedback = "занятие добавлено";
                    setTimeout(() => {
                        this.feedback = "";
                        this.changeDetectorRef.markForCheck();
                    }, 2500);
                });
            }
        } else {
            this.errorText = "Заполните все поля";
        }
    }
}
