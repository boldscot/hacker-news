import { GridLayout } from './../../model/grid-layout';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GridLayoutService {
  private breakPoints: string[] = [
    Breakpoints.XSmall,
    Breakpoints.Small,
    Breakpoints.Medium,
    Breakpoints.Large,
    Breakpoints.XLarge,
  ];

  constructor(private breakpointObserver: BreakpointObserver) { }

  observeBreakpoints() {
    return this.breakpointObserver.observe(this.breakPoints);
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
