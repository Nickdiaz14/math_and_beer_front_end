import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Home } from "./home"
import { gameRecord, RecordsService } from "./home.service";
import { of, throwError } from "rxjs";
import { FormsModule } from "@angular/forms";
import { vi, Mocked } from "vitest";
import { HttpClientModule } from "@angular/common/http";

describe('Home Component', () => {
    let component: Home
    let fixture: ComponentFixture<Home>
    let mockService: Partial<Mocked<RecordsService>>;

    beforeEach(async () => {
        mockService = {
            createOrUpdateRecord: vi.fn(),
            getLeaderboard: vi.fn(),
            getLeaderboards: vi.fn()
        };


        await TestBed.configureTestingModule({
            imports: [Home, FormsModule, HttpClientModule],
            providers: [{ provide: RecordsService, useValue: mockService }]
        }).compileComponents();

        fixture = TestBed.createComponent(Home);
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