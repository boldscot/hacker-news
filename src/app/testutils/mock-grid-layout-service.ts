import { GridLayout } from './../model';
import { Breakpoints } from '@angular/cdk/layout';
import { Observable, of } from 'rxjs';

export class MockGridLayoutService {
  observeBreakpoints(isMedium: boolean): Observable<string> {
    return isMedium? of('Medium'): of('Large');
  }

  getGridLayout(): GridLayout {
    return {
      columns: '3',
      rowHeight: '11rem',
      gutterSize: '1rem',
      gridSize: 27
    }
  }

  getBreakPoints(): readonly string[] {
    return [Breakpoints.Large];
  }
}
