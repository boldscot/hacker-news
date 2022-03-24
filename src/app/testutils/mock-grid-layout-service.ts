import { GridLayout } from './../model/grid-layout';
import { BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { Observable, of } from 'rxjs';

export class MockGridLayoutService {
  observeBreakpoints(): Observable<BreakpointState> {
    return of({
      matches: true,
      breakpoints: {
        '(min-width: 1280px) and (max-width: 1919.98px)': true
      }
    });
  }

  getGridLayout(point: string): GridLayout {
    return {
      columns: '3',
      rowHeight: '11rem',
      gutterSize: '1rem',
      gridSize: 27
    }
  }
}
