import { Component, OnInit, inject, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RecordsService, gameRecord } from "./leaderboards.service";

@Component({
    selector: "app-leaderboards",
    imports: [CommonModule, FormsModule],
    templateUrl: "./leaderboards.html",
    styleUrl: "./leaderboards.css"
})
export class Leaderboards implements OnInit {
    game: string | null = null;
    selectedGame = signal<any>(null);
    record = signal<gameRecord[]>([]);
    loading = signal<boolean>(false);
    errormensaje = signal<string>("");
    selectedRecordId: string | null = null;
    games = signal<string[]>([]);

    private recordsService = inject(RecordsService);

    ngOnInit(): void {
        this.loadRecords();
    }

    loadRecords(): void {
        this.loading.set(true);
        this.recordsService.getLeaderboards().subscribe({
            next: (data: gameRecord[]) => {
                this.games.set(Array.from(new Set(data.map(r => r.game))));
                this.record.set(data);
                this.loading.set(false);
            },
            error: (error: Error) => {
                console.error('Ocurrió un error:', error);
                this.errormensaje.set("Failed to load records: " + error.message);
                this.loading.set(false);
            }
        });
    }

    filterRecords(): void {
        this.selectedGame.set(this.record().filter(r => r.game === this.game));
    }
}