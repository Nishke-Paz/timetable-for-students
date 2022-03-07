import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { SttLesson, SttTimetable } from "../stt-store/state/stt-group.state";
import { SttGroupModel } from "../stt-store/model/stt-group.model";

@Injectable({
    providedIn: "root"
})
export class SttServerService{
    constructor(private httpClient: HttpClient) {
    }
    getListGroup(): Observable<SttGroupModel[]>{
        return this.httpClient.get<SttGroupModel[]>("/timetable");
    }
    getGroupById(idGroup: number): Observable<SttTimetable[]>{
        return this.httpClient.post<SttTimetable[]>("/timetable/findById", { id: idGroup });
    }
    deleteLesson(id: number): Observable<unknown>{
        return this.httpClient.delete(`/timetable/${id}/deleteLesson`);
    }
    createGroup( name: string ): Observable<{ group: string, id: number }>{
        return this.httpClient.post<{ group: string, id: number }>("/timetable/createGroup", { "group": name });
    }
    addTimetable(data: SttLesson, id: number, date: string): Observable<unknown>{
        return this.httpClient.put(`/timetable/${id}/${date}/addTimetable`, data);
    }
    editLesson(
        idLesson: number,
        idGroup: number,
        dayOfTheWeek: string,
        lesson: SttLesson): Observable<unknown>{
        return this.httpClient.put(`/timetable/${idLesson}/${idGroup}/${dayOfTheWeek}/editTimetable`, lesson);
    }
    deleteGroup(id: number): void{
        this.httpClient.delete(`/timetable/${id}/delete`).subscribe();
    }
}
