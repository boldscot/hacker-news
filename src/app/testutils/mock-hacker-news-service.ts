import { Observable, of } from 'rxjs';
import { Item } from '../model/item';

/**
 * Mock service class for testing purposes
 */
export class MockHackerNewsService {
  mockItem: Item = {
      id: 1,
      type: 'story',
      title: 'This is a story item',
      url: 'https://www.hackernews.com',
      by: 'Mr Anderson',
      score: 1999,
      descendants: 30
    }

  getItem(id: number): Observable<Item | null> {
    if (id === 1) {
       return of(this.mockItem);
    }
    return of(null);
  };
}
