import { Component, OnInit, inject, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HomeService, Event, Planner } from "./home.service";
import { RevealDirective } from '../../directives/reveal.directive';
import { CounterDirective } from '../../directives/counter.directive';
import { DriveImgPipe } from '../../drive-img-pipe';

@Component({
    selector: "app-Home",
    imports: [CommonModule, FormsModule, DriveImgPipe, RevealDirective, CounterDirective],
    templateUrl: "./home.html",
    styleUrl: "./home.css"
})
export class Home implements OnInit {
    loading = signal<boolean>(false);
    errormensaje = signal<string>("");
    n_charlas = signal<number>(0);
    cities = signal<number>(0);
    years = signal<number>(0);
    events = signal<{ [year: number]: Event[] }>({});
    future_events = signal<{ [city: string]: Event }>({});
    planners = signal<any>([]);

    private homeService = inject(HomeService);

    ngOnInit(): void {
        this.loadEvents();
        this.loadPlanners();
    }

    loadEvents(): void {
        this.loading.set(true);
        this.homeService.getEvents().subscribe({
            next: (data: Event[]) => {
                data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
                this.years.set(new Set(data.map(r => new Date(r.date).getFullYear())).size);
                this.cities.set(new Set(data.map(r => r.city)).size);
                
                const eventsMap: { [year: number]: Event[] } = {};
                const futureMap: { [city: string]: Event } = {};
                let charlasCount = 0;

                data.forEach(c => {
                    const hoy = new Date();
                    const eventDate = new Date(c.date);
                    const year = eventDate.getFullYear();
                    
                    if (eventDate >= hoy) {
                        futureMap[c.city] = c;
                    } else {
                        charlasCount++;
                        if (!eventsMap[year]) eventsMap[year] = [];
                        eventsMap[year].push(c);
                    }
                });
                
                Object.values(eventsMap).forEach(list => {
                    list.forEach(e => {
                        if (typeof e.summary === 'string') {
                            try {
                                e.summary = Object.values(JSON.parse(e.summary));
                            } catch (err) { }
                        }
                    });
                });
                
                this.n_charlas.set(charlasCount);
                this.events.set(eventsMap);
                this.future_events.set(futureMap);
                this.loading.set(false);
            },
            error: (error: Error) => {
                console.error('Ocurrió un error:', error);
                this.errormensaje.set("Failed to load records: " + error.message);
                this.loading.set(false);
            }
        });
    }

    loadPlanners(): void {
        this.loading.set(true);
        this.homeService.getPlanners().subscribe({
            next: (data: Planner[]) => {
                this.planners.set(data);
                this.loading.set(false);
            },
            error: (error: Error) => {
                console.error('Ocurrió un error:', error);
                this.errormensaje.set("Failed to load records: " + error.message);
                this.loading.set(false);
            }
        });
    }
}