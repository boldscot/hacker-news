import { environment } from './../../../environments/environment';
import { TestBed } from '@angular/core/testing';
import { HackerNewsService } from './hacker-news.service';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

fdescribe('HackerNewsService', () => {
  let service: HackerNewsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        HackerNewsService
      ]
    });
    service = TestBed.inject(HackerNewsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getMaxItemId() should return Observable<number>', () => {
    const maxId = 9100012;
    // Testing working request
    service.getMaxItemId().subscribe((response: number | null) => {
      expect(response).toBeDefined();
      expect(response).toBe(maxId);
    });

    let req: TestRequest = httpTestingController.expectOne(`${environment.hackerNewsUrl}/maxitem.json`);
    expect(req.request.method).toBe('GET');
    req.flush(maxId);
  })

  it('#getMaxItemId() should return Observable<null>', () => {
    // Testing failing request
    service.getMaxItemId().subscribe((response: number | null) => {
      expect(response).toBeNull();
    });

    let req = httpTestingController.expectOne(`${environment.hackerNewsUrl}/maxitem.json`);
    req.flush(null, {status: 401, statusText: 'Unauthorised'});
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
