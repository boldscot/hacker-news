import { Observable, of } from 'rxjs';
import { Item } from '../model/item';

/**
 * Mock service class for testing purposes
 */
export class MockHackerNewsService {

  getItem(id: number): Observable<Item | null> {
    if (id === 1) {
      const item: Item = {
        id: 1,
        type: 'story',
        title: 'This is a story item'
      }
      return of(item);
    }

    return of(null);
  };
}
