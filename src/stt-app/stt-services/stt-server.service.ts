import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { SttGroup } from "../stt-store/state/stt-group-list.state";
import { SttTimetable } from "../stt-store/state/stt-group.state";


@Injectable({
    providedIn: "root"
})
export class SttServerService{
    constructor(private httpClient: HttpClient) {
    }

    getListGroup(): Observable<SttGroup[]>{
        return this.httpClient.get<SttGroup[]>("/timetable");
    }

    getGroupById(idGroup: number): Observable<SttTimetable[]>{
        return this.httpClient.post<SttTimetable[]>("/timetable/findById", { id: idGroup });
    }
}
