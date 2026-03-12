import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RecordsService, User, gameRecord } from "./home.service";

@Component({
    selector: "app-home",
    imports: [CommonModule, FormsModule, HttpClientModule],
    templateUrl: "./home.html",
    styleUrl: "./home.css"
})

export class Home implements OnInit {
    game: string | null = null;
    selectedGame: any = null;
    record: gameRecord[] = [];
    loading: boolean = false;
    errormensaje: string = "";
    selectedRecordId: string | null = null;
    games: string[] = [];

    constructor(private RecordsService: RecordsService) { }

    ngOnInit(): void {
        this.loadRecords();
    }

    loadRecords(): void {
        this.loading = true;
        this.RecordsService.getLeaderboards().subscribe({
            next: (data: gameRecord[]) => {
                this.games = Array.from(new Set(data.map(r => r.game)));
                console.log('Datos recibidos de la API:', data);
                console.log('Juegos únicos extraídos:', this.games);
                this.record = data;
                this.loading = false;
            },
            error: (error) => {
                console.error('Ocurrió un error:', error);

                this.errormensaje = "Failed to load records: " + error.message;
                this.loading = false;
            }
        });
    }

    filterRecords(): void {
        this.selectedGame = this.record.filter(r => r.game === this.game);
    }
}