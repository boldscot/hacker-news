import { GridLayout } from './../../model/grid-layout';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GridLayoutService {

  constructor(private breakpointObserver: BreakpointObserver) { }

  observeBreakpoints(value: string | readonly string[]) {
    return this.breakpointObserver.observe(value);
  }

  getGridSettings(screenSize: string): GridLayout {
    switch (screenSize) {
      case 'XLarge': {
        return {
          columns: '3',
          rowHeight: '11rem',
          gutterSize: '0.5rem',
          gridSize: 27
        }
      }

      case 'Large': {
        return {
          columns: '2',
          rowHeight: '11rem',
          gutterSize: '0.5rem',
          gridSize: 20
        }
      }

      default:
        return {
          columns: '3',
          rowHeight: '11rem',
          gutterSize: '0.5rem',
          gridSize: 27
        }
    }
  }
}
