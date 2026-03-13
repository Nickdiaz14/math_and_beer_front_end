import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface gameRecord {
    _id: string;
    username: string;
    game: string;
    record: BigInt;
    string_record: string
}

export interface User {
    _id: string;
    username: string;
    UUID_id: string
}

@Injectable({
    providedIn: "root"
})

export class RecordsService {
    private url = "https://mathandbeerjs-production.up.railway.app/api"

    constructor(private http: HttpClient) { }

    createOrUpdateRecord(body: { username: string, record: BigInt, string_record: string, game: string }): Observable<gameRecord> {
        return this.http.put<gameRecord>(`${this.url}/record`, body)
    }

    getLeaderboard(game: string): Observable<gameRecord[]> {
        return this.http.get<gameRecord[]>(`${this.url}/leaderboard/${game}`)
    }

    getLeaderboards(): Observable<gameRecord[]> {
        return this.http.get<gameRecord[]>(`${this.url}/leaderboards`)
    }
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

    getUser(uuid: string): Observable<User> {
        console.log("Fetching user with ID:", uuid);
        return this.http.get<User>(`${this.url}/get_user/${uuid}`)
    }
}