import { TestBed } from "@angular/core/testing";
import { RecordsService } from "./leaderboards.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

describe('Records Service', () => {
    let service: RecordsService
    let httpMock: HttpTestingController

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [RecordsService]
        })
        service = TestBed.inject(RecordsService)
        httpMock = TestBed.inject(HttpTestingController)
    })

    afterEach(() => {
        httpMock.verify()
    })

    it('Obtener los records (GET)', () => {
        const dataFalsa = [
            { _id: '1', username: "A", game: "B", record: 100, string_record: "00:01.00" }
        ];

        service.getLeaderboards().subscribe(Record => {
            expect(Record.length).toBe(1)
        })

        const req = httpMock.expectOne('http://127.0.0.1:5000/api/leaderboards')
        expect(req.request.method).toBe('GET')

        req.flush(dataFalsa)
    })
})