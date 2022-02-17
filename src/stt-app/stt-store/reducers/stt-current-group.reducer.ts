import { createReducer, on } from "@ngrx/store";
import { initialSttGroupState } from "../state/stt-group.state";
import { editTimetableSuccess, loadGroupSuccess } from "../actions/stt-current-group.actions";

export const sttCurrentGroupReducer = createReducer(
    initialSttGroupState,
    on(loadGroupSuccess, (state, action) => ({
        ...state,
        currentTimetable: action.timetable
    })),
    on(editTimetableSuccess, (state, action) => ({
        ...state,
        currentTimetable: [action.timetable]
    })),
);
