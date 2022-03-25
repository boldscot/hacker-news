import { MockGridLayoutService } from 'src/app/testutils/mock-grid-layout-service';
import { GridLayout } from './../../model/grid-layout';
import { Breakpoints } from '@angular/cdk/layout';
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

  it('#observeBreakpoints() should return Observable<string>', () => {
    const types: string = 'XSmall Small Medium Large Xlarge';
    service.observeBreakpoints(service.getBreakPoints()).subscribe((breakPoint: string) => {
      expect(breakPoint).not.toBeNull();
      // The size will depened on teh size of the window the karma runner is running in
      expect(types).toContain(breakPoint)
    });
  });

  it('should observeBreakpoints() return Large', () => {
    service.observeBreakpoints(['sdsdsd',]).subscribe((breakPoint: string) => {
      expect(breakPoint).not.toBeNull();
      expect(breakPoint).toEqual('Large');
    });
  });

  it('#getGridSettings() should return GridLayout', () => {
    let gridLayout: GridLayout = service.getGridLayout(Breakpoints.XLarge);
    expect(gridLayout).not.toBeNull();
    expect(gridLayout.columns).toEqual('3');
    expect(gridLayout.gridSize).toBe(27);
    expect(gridLayout.gutterSize).toEqual('1rem');
    expect(gridLayout.rowHeight).toEqual('11rem');


    gridLayout = service.getGridLayout(Breakpoints.Large);
    expect(gridLayout).not.toBeNull();
    expect(gridLayout.columns).toEqual('3');
    expect(gridLayout.gridSize).toBe(27);
    expect(gridLayout.gutterSize).toEqual('1rem');
    expect(gridLayout.rowHeight).toEqual('11rem');

    gridLayout = service.getGridLayout(Breakpoints.Medium);
    expect(gridLayout).not.toBeNull();
    expect(gridLayout.columns).toEqual('2');
    expect(gridLayout.gutterSize).toEqual('1rem');
    expect(gridLayout.rowHeight).toEqual('11rem');
    expect(gridLayout.gridSize).toBe(18);

    gridLayout = service.getGridLayout(Breakpoints.Small);
    expect(gridLayout).not.toBeNull();
    expect(gridLayout.columns).toEqual('1');
    expect(gridLayout.gridSize).toBe(9);
    expect(gridLayout.gutterSize).toEqual('1rem');
    expect(gridLayout.rowHeight).toEqual('11rem');

    gridLayout = service.getGridLayout(Breakpoints.XSmall);
    expect(gridLayout).not.toBeNull();
    expect(gridLayout.columns).toEqual('1');
    expect(gridLayout.gridSize).toBe(9);
    expect(gridLayout.gutterSize).toEqual('1rem');
    expect(gridLayout.rowHeight).toEqual('11rem');

    // Covering the unknown branch, it should use the default swicth branch
    gridLayout = service.getGridLayout('');
    expect(gridLayout).not.toBeNull();
    expect(gridLayout.columns).toEqual('3');
    expect(gridLayout.gridSize).toBe(27);
    expect(gridLayout.gutterSize).toEqual('1rem');
    expect(gridLayout.rowHeight).toEqual('11rem');
  });
});
