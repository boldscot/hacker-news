import { TestBed } from '@angular/core/testing';

import { HackerNewsService } from './hacker-news.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('HackerNewsService', () => {
  let service: HackerNewsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        HttpTestingController
      ]
    });
    service = TestBed.inject(HackerNewsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
