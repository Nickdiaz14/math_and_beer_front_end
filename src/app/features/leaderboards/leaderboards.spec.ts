import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Leaderboards } from "./leaderboards"
import { gameRecord, RecordsService } from "./leaderboards.service";
import { of, throwError } from "rxjs";
import { FormsModule } from "@angular/forms";
import { vi, Mocked } from "vitest";
import { HttpClientModule } from "@angular/common/http";

describe('Leaderboards Component', () => {
    let component: Leaderboards
    let fixture: ComponentFixture<Leaderboards>
    let mockService: Partial<Mocked<RecordsService>>;

    beforeEach(async () => {
        mockService = {
            createOrUpdateRecord: vi.fn(),
            getLeaderboard: vi.fn(),
            getLeaderboards: vi.fn()
        };


        await TestBed.configureTestingModule({
            imports: [Leaderboards, FormsModule, HttpClientModule],
            providers: [{ provide: RecordsService, useValue: mockService }]
        }).compileComponents();

        fixture = TestBed.createComponent(Leaderboards);
        component = fixture.componentInstance;
    });

    it('Debería cargar records al iniciar', () => {
        const mockRecords: gameRecord[] = [
            {
                _id: '1',
                username: 'player1',
                game: 'tetris',
                record: 100n,
                string_record: '100'
            },
            {
                _id: '1',
                username: 'player1',
                game: 'tetris',
                record: 100n,
                string_record: '100'
            },
        ];

        mockService.getLeaderboard!.mockReturnValue(of(mockRecords));
    })
})