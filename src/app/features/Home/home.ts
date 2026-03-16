import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HomeService, Event } from "./home.service";

@Component({
    selector: "app-Home",
    imports: [CommonModule, FormsModule, HttpClientModule],
    templateUrl: "./Home.html",
    styleUrl: "./Home.css"
})

export class Home implements OnInit {
    loading: boolean = false
    years: number[] = []
    errormensaje: string = ""
    constructor(private HomeService: HomeService) { }

    ngOnInit(): void {
    }

    loadEvents(): void {
        this.loading = true;
        this.HomeService.getEvents().subscribe({
            next: (data: Event[]) => {
                this.years = Array.from(new Set(data.map(r => r.date.getFullYear())));
                console.log('Datos recibidos de la API:', data);
                console.log('años únicos extraídos:', this.years);
                this.loading = false;
            },
            error: (error) => {
                console.error('Ocurrió un error:', error);

                this.errormensaje = "Failed to load records: " + error.message;
                this.loading = false;
            }
        });
    }
}