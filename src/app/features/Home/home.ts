import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HomeService, Event, Planner } from "./home.service";
import { SharedModule } from '../../shared/shared-module';
import { DriveImgPipe } from '../../drive-img-pipe'

@Component({
    selector: "app-Home",
    imports: [CommonModule, FormsModule, HttpClientModule, SharedModule, DriveImgPipe],
    templateUrl: "./home.html",
    styleUrl: "./home.css"
})

export class Home implements OnInit {
    loading: boolean = false
    errormensaje: string = "";
    n_charlas: number = 0;
    cities: number = 0;
    years: number = 0;
    events: { [year: number]: any[] } = {};
    future_events: { [city: string]: any } = {};
    planners: any = [];
    constructor(private HomeService: HomeService, private cdr: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.loadEvents();
        this.loadPlanners();
    }

    loadEvents(): void {
        this.loading = true;
        this.HomeService.getEvents().subscribe({
            next: (data: Event[]) => {
                data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
                this.years = Array.from(new Set(data.map(r => new Date(r.date).getFullYear()))).length;
                this.cities = Array.from(new Set(data.map(r => r.city))).length;
                data.forEach(c => {
                    const hoy = new Date();
                    const eventDate = new Date(c.date);
                    const year = eventDate.getFullYear();
                    if (eventDate >= hoy) {
                        this.future_events[c.city] = c;
                    } else {
                        this.n_charlas++
                        (this.events[year] ??= []).push(c);
                    }
                });
                Object.values(this.events).forEach(list => {
                    list.forEach(e => {
                        e.summary = Object.values(JSON.parse(e.summary));
                    });
                });
                this.loading = false;
                console.log('Datos recibidos de la API:', this.events, this.future_events);
                this.cdr.detectChanges();

            },
            error: (error) => {
                console.error('Ocurrió un error:', error);

                this.errormensaje = "Failed to load records: " + error.message;
                this.loading = false;
                this.cdr.detectChanges();

            }
        });
    }

    loadPlanners(): void {
        this.loading = true;
        this.HomeService.getPlanners().subscribe({
            next: (data: Planner[]) => {
                this.planners = data
                this.loading = false;
                console.log('Datos recibidos de la API:', this.planners);
                this.cdr.detectChanges();

            },
            error: (error) => {
                console.error('Ocurrió un error:', error);

                this.errormensaje = "Failed to load records: " + error.message;
                this.loading = false;
                this.cdr.detectChanges();

            }
        })
    }

}