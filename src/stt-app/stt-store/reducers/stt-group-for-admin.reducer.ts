import { createReducer, on } from "@ngrx/store";
import { initialSttGroupForAdminState } from "../state/stt-group-for-admin.state";
import { loadGroupForAdminSuccess } from "../actions/stt-group-for-admin.actions";


export const sttGroupForAdminReducer = createReducer(
    initialSttGroupForAdminState,
    on(loadGroupForAdminSuccess, (state, action) => ({
        ...state,
        currentTimetable: action.timetable
    })),
);
