import { Observable } from 'rxjs';
import { GridLayout } from './../../model/grid-layout';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GridLayoutService {
  /**
   * Breakpoints in px to text mappings, used in the getGridSettings() function
   * to decide what grid settings to use.
   * @private
   * @type {Map<string, string>}
   * @memberof GridLayoutService
   */
  private breakPointMappings: Map<string, string> = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  constructor(private breakpointObserver: BreakpointObserver) { }

  /**
   * Returns an observable of results for the given queries that will emit new results
   * for any changes in matching of the given queries.
   * Using the keys from the breakpoint mappings as the media queries
   * @returns Observable<BreakpointState>
   */
  observeBreakpoints(): Observable<BreakpointState> {
    return this.breakpointObserver.observe(Array.from(this.breakPointMappings.keys()));
  }

  /**
   * Takes the given breakpoint and returns the grid settings for that screen size
   * @param breakPoint Breakpoint media query
   * @returns GridLayout
   */
  getGridLayout(breakPoint: string): GridLayout {
    const screenSize: string = this.breakPointMappings.get(breakPoint) ?? 'unknown';

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
          gutterSize: '1rem',
          gridSize: 27
        }
    }
  }

  getbreakpointMapping(breakPoint: string): string | undefined {
    return this.breakPointMappings.get(breakPoint);
  }
}
