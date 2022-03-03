
export interface SttTimetable {
    id: number;
    group: string;
    monday: SttLesson[];
    tuesday: SttLesson[];
    wednesday: SttLesson[];
    thursday: SttLesson[];
    friday: SttLesson[];
    saturday: SttLesson[];
    sunday: SttLesson[];
}

export interface SttLesson {
    id?: number;
    subject: string;
    teacher: string;
    typeLesson: string;
    lectureHall: string;
    time: string;
}

export interface SttGroupState {
    currentTimetable: SttTimetable[] | null;
}

export const initialSttGroupState: SttGroupState = {
    currentTimetable: null,
};
