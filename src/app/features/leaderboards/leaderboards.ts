import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RecordsService, gameRecord } from "./leaderboards.service";

@Component({
    selector: "app-leaderboards",
    imports: [CommonModule, FormsModule, HttpClientModule],
    templateUrl: "./leaderboards.html",
    styleUrl: "./leaderboards.css"
})

export class Leaderboards implements OnInit {
    game: string | null = null;
    selectedGame: any = null;
    record: gameRecord[] = [];
    loading: boolean = false;
    errormensaje: string = "";
    selectedRecordId: string | null = null;
    games: string[] = [];

    constructor(private RecordsService: RecordsService, private cdr: ChangeDetectorRef) { }

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

    filterRecords(): void {
        this.selectedGame = this.record.filter(r => r.game === this.game);
    }
}