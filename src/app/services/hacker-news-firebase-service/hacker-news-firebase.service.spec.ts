import { TestBed } from '@angular/core/testing';

import { HackerNewsFirebaseService } from './hacker-news-firebase.service';

describe('HackerNewsFirebaseService', () => {
  let service: HackerNewsFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HackerNewsFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
