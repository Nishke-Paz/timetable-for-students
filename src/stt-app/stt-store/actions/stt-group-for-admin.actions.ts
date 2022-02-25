import { createAction, props } from "@ngrx/store";
import { SttTimetable } from "../state/stt-group.state";

export const deleteLesson = createAction(
    "[Current-group] deleteLesson",
    props<{ idLesson: number, idGroup: number }>(),
);

export const loadGroupForAdmin = createAction(
    "[Current-group] loadGroupForAdmin",
    props<{ id: number }>(),
);

export const loadGroupForAdminSuccess = createAction(
    "[Current-group] loadGroupForAdminSuccess",
    props<{ timetable: SttTimetable[] }>(),
);
