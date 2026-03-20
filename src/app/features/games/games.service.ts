import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface User {
    created: boolean;
    observation: any
}

@Injectable({
    providedIn: "root"
})

export class UsersService {
    private url = "https://mathandbeerjs-production.up.railway.app/api"

    constructor(private http: HttpClient) { }

    createUser(body: { username: string, UUID_id: string }): Observable<User> {
        return this.http.post<User>(`${this.url}/create_user`, body)
    }

    getUser(uuid: string): Observable<string> {
        return this.http.get<string>(`${this.url}/get_user/${uuid}`)
    }
}