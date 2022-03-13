import { environment } from './../../../environments/environment';
import { TestBed } from '@angular/core/testing';
import { HackerNewsService } from './hacker-news.service';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

fdescribe('HackerNewsService', () => {
  let service: HackerNewsService;
  let httpTestingController: HttpTestingController;

  const noContentHeaders = {
    status: 204,
    statusText: 'No Content'
  }

  const failedRequestHeaders = {
    status: 401,
    statusText: 'Unauthorised'
  }

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
    req.flush(null, failedRequestHeaders);
  });

  it('#getMaxItemId() should return Observable<null>', () => {
    // Testing working request but no content
    service.getMaxItemId().subscribe((response: number | null) => {
      expect(response).toBeNull();
    });

    let req = httpTestingController.expectOne(`${environment.hackerNewsUrl}/maxitem.json`);
    req.flush(null, noContentHeaders);
  });

  it('#getTopStories() should return Observable<number[]>', () => {
    const topStories = [12112,12113,12114,12115,12116,12117];
    // Testing working request
    service.getStories('topstories').subscribe((response: number[] | null) => {
      expect(response).toBeDefined();
      expect(response).toEqual(topStories);
    });

    let req: TestRequest = httpTestingController.expectOne(`${environment.hackerNewsUrl}/topstories.json`);
    expect(req.request.method).toBe('GET');
    req.flush(topStories);
  });

  it('#getTopStories() should return Observable<null>', () => {
    // Testing failing request
    service.getStories('topstories').subscribe((response: number[] | null) => {
      expect(response).toBeNull();
    });

    let req: TestRequest = httpTestingController.expectOne(`${environment.hackerNewsUrl}/topstories.json`);
    expect(req.request.method).toBe('GET');
    req.flush(null, failedRequestHeaders);
  });

  it('#getTopStories() should return Observable<null>', () => {
    // Testing working request but no content
    service.getStories('topstories').subscribe((response: number[] | null) => {
      expect(response).toBeNull();
    });

    let req: TestRequest = httpTestingController.expectOne(`${environment.hackerNewsUrl}/topstories.json`);
    expect(req.request.method).toBe('GET');
    req.flush(null, noContentHeaders);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
