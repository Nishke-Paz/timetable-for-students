import { createReducer, on } from "@ngrx/store";
import { initialSttGroupState, SttLesson, SttTimetable } from "../state/stt-group.state";
import { editTimetableSuccess, loadGroupSuccess } from "../actions/stt-current-group.actions";

export function sortByTime (a: SttLesson, b: SttLesson): number {
    if (a.time > b.time){
        return 1;
    }
    if (a.time < b.time){
        return -1;
    }
    return 0;
}

export const sttCurrentGroupReducer = createReducer(
    initialSttGroupState,
    on(loadGroupSuccess, (state, action) => ({
        ...state,
        currentTimetable: action.timetable.map((data) => {
            const sortTimetable: SttTimetable = JSON.parse(JSON.stringify(data));
            sortTimetable.monday.sort(sortByTime);
            sortTimetable.tuesday.sort(sortByTime);
            sortTimetable.wednesday.sort(sortByTime);
            sortTimetable.thursday.sort(sortByTime);
            sortTimetable.friday.sort(sortByTime);
            sortTimetable.saturday.sort(sortByTime);
            sortTimetable.sunday.sort(sortByTime);
            return sortTimetable;
        })
    })),
    on(editTimetableSuccess, (state, action) => ({
        ...state,
        currentTimetable: [action.timetable]
    })),
);
