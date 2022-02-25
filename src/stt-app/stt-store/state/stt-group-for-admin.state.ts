import { SttTimetable } from "./stt-group.state";

export interface SttGroupForAdminState {
    currentTimetable: SttTimetable[] | null;
}

export const initialSttGroupForAdminState: SttGroupForAdminState = {
    currentTimetable: null,
};
