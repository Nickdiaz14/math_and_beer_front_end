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

export interface Planner {
    person: string,
    image: string,
    description: string
}

@Injectable({
    providedIn: "root"
})

export class HomeService {
    private url = "https://mathandbeerjs-production.up.railway.app/api"

    constructor(private http: HttpClient) { }

    getEvents(): Observable<Event[]> {
        return this.http.get<Event[]>(`${this.url}/events`)
    }

    getPlanners(): Observable<Planner[]> {
        return this.http.get<Planner[]>('assets/json/equipo.json');
    }

}