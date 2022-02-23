import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { SttTimetable } from "../stt-store/state/stt-group.state";
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
}
