import { Observable } from 'rxjs';
import { GridLayout } from './../../model/grid-layout';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GridLayoutService {
  private breakPointMappings: Map<string, string> = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  constructor(private breakpointObserver: BreakpointObserver) { }

  observeBreakpoints(): Observable<BreakpointState> {
    return this.breakpointObserver.observe(Array.from(this.breakPointMappings.keys()));
  }

  getGridSettings(breakPoint: string): GridLayout {
    const screenSize: string = this.breakPointMappings.get(breakPoint) ?? 'unknown';
    console.log(screenSize);

    switch (screenSize) {
      case 'XLarge':
      case 'Large': {
        return {
          columns: '3',
          rowHeight: '11rem',
          gutterSize: '1rem',
          gridSize: 27
        }
      }

      case 'Medium': {
        return {
          columns: '2',
          rowHeight: '11rem',
          gutterSize: '1rem',
          gridSize: 18
        }
      }

      case 'Small' :
      case 'XSmall' : {
        return {
          columns: '1',
          rowHeight: '11rem',
          gutterSize: '1rem',
          gridSize: 9
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
