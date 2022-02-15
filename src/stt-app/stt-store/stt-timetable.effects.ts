import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { SttServerService } from "../stt-services/stt-server.service";
import { loadGroup, loadGroupSuccess } from "./actions/stt-current-group.actions";
import { map, mergeMap } from "rxjs";
import { loadGroups, loadGroupsSuccess } from "./actions/stt-group-list.actions";
import { SttGroup } from "./state/stt-group-list.state";
import { SttTimetable } from "./state/stt-group.state";


@Injectable({
    providedIn: "root"
})
export class SttTimetableEffects{
    constructor(
        private actions: Actions,
        private service: SttServerService) {
    }
    loadListGroup = createEffect(() => {
 return this.actions.pipe(
            ofType(loadGroups),
            mergeMap(() =>
                this.service.getListGroup().pipe(
                    map((groupList: SttGroup[]) =>  loadGroupsSuccess({ groups: groupList })),
                ),
            ),
        );
},
    );
    loadGroup = createEffect( () => {
 return this.actions.pipe(
            ofType(loadGroup),
            mergeMap((data: { id: number }) =>
                this.service.getGroupById(data.id).pipe(
                    map((timetableList: SttTimetable[]) => loadGroupSuccess({ timetable: timetableList })),
                ),
            ),
        );
},
    );
}
