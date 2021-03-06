import { createAction, props } from "@ngrx/store";
import { SttTimetable } from "../state/stt-group.state";

export const loadGroup = createAction(
    "[Current-group] loadGroup",
    props<{ id: number }>(),
);

export const loadGroupSuccess = createAction(
    "[Current-group] loadGroupSuccess",
    props<{ timetable: SttTimetable[] }>(),
);

