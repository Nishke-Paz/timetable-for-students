import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class SttAuthService{
    constructor(private httpClient: HttpClient) {
    }

    auth(data): Observable<unknown>{
        return this.httpClient.post("/api/login", data, { withCredentials: true });
    }

    user(): Observable<unknown>{
        return this.httpClient.get("/api/user");
    }

    logout(): void{
        this.httpClient.post("/api/logout", {}, { withCredentials: true }).subscribe();
    }
}
