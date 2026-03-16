import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface Event {
    date: Date;
    speaker: string;
    title: string;
    summary: JSON,
    place: string,
    video: string,
    image: string,
    city: string
}

@Injectable({
    providedIn: "root"
})

export class HomeService {
    private url = "https://mathandbeerjs-production.up.railway.app/api"

    constructor(private http: HttpClient) { }

    getEvents(): Observable<Event[]> {
        return this.http.get<Event[]>(`${this.url}/leaderboards`)
    }

}