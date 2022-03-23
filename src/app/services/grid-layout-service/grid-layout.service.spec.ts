import { GridLayout } from './../../model/grid-layout';
import { BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { TestBed } from '@angular/core/testing';

import { GridLayoutService } from './grid-layout.service';

describe('GridLayoutService', () => {
  let service: GridLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GridLayoutService
      ]
    });
    service = TestBed.inject(GridLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#observeBreakpoints() should return Observable<BreakpointState>', () => {
    service.observeBreakpoints().subscribe((state: BreakpointState) => {
      expect(state).not.toBeNull();
      expect(state.breakpoints[Breakpoints.XSmall]).not.toBeUndefined();
      expect(state.breakpoints[Breakpoints.Small]).not.toBeUndefined();
      expect(state.breakpoints[Breakpoints.Medium]).not.toBeUndefined();
      expect(state.breakpoints[Breakpoints.Large]).not.toBeUndefined();
      expect(state.breakpoints[Breakpoints.XLarge]).not.toBeUndefined();
    });
  });

  it('#getGridSettings() should return GridLayout', () => {
    let gridLayout: GridLayout = service.getGridLayout(Breakpoints.Large);
    expect(gridLayout).not.toBeNull();
    expect(gridLayout.columns).toEqual('3');
    expect(gridLayout.gridSize).toBe(27);

    gridLayout = service.getGridLayout(Breakpoints.XSmall);
    expect(gridLayout).not.toBeNull();
    expect(gridLayout.gutterSize).toEqual('1rem');
    expect(gridLayout.rowHeight).toEqual('11rem');

    gridLayout = service.getGridLayout(Breakpoints.Medium);
    expect(gridLayout).not.toBeNull();
    expect(gridLayout.columns).toEqual('2');
    expect(gridLayout.gutterSize).toEqual('1rem');
    expect(gridLayout.rowHeight).toEqual('11rem');
    expect(gridLayout.gridSize).toBe(18);
  });
});
