import { TestBed } from '@angular/core/testing';

import { HackerNewsService } from './hacker-news.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HackerNewsService', () => {
  let service: HackerNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(HackerNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
