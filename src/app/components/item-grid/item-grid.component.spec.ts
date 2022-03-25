import { AppComponent } from './../../app.component';
import { MockGridLayoutService } from './../../testutils/mock-grid-layout-service';
import { GridLayoutService } from './../../services/grid-layout-service/grid-layout.service';
import { ComponentsModule } from './../components.module';
import { AngularMaterialModule } from './../../modules/angular-material/angular-material.module';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HackerNewsService } from 'src/app/services/hacker-news-service/hacker-news.service';
import { MockHackerNewsService } from 'src/app/testutils';
import { ItemGridComponent } from './item-grid.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';

describe('ItemGridComponent', () => {
  let component: ItemGridComponent;
  let fixture: ComponentFixture<ItemGridComponent>;
  const mockHackerNewsService: MockHackerNewsService = new MockHackerNewsService();
  const mockGridLayoutService: MockGridLayoutService = new MockGridLayoutService();

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ItemGridComponent,
      ],
      imports: [
        AngularMaterialModule,
        ComponentsModule
      ],
      providers: [
        { provide: HackerNewsService, useValue: mockHackerNewsService },
        { provide: GridLayoutService, useValue: mockGridLayoutService }
      ],
    });

    fixture = TestBed.createComponent(ItemGridComponent);
    component = fixture.componentInstance;
    component.stories$ = mockHackerNewsService.getStories();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate the stories$ Observable and set the gridFirstItemIndex to zero', () => {
    expect(component.gridFirstItemIndex).withContext('is initialised to 0').toBe(0);
    component.gridFirstItemIndex = 100;
    component.storyType = 'newstories';
    fixture.detectChanges();
    expect(component.gridFirstItemIndex).toBe(0);
    component.stories$.subscribe((ids: number[] | null) => {
      expect(ids).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
    });
  });

  it('#updateFirstGridIndex() should increment the gridFirstItemIndex property', fakeAsync(() => {
    component.gridFirstItemIndex = 1000;
    component.updateFirstGridIndex(true);
    fixture.detectChanges()

    component.updateGridFirstItemIndex$.subscribe((isIncrement: boolean) => {
      expect(isIncrement).toBeTruthy();
    });
    // debounce Time
    tick(300);
    expect(component.gridFirstItemIndex).toBe(1027);
  }));

  it('#updateFirstGridIndex() should decrement the gridFirstItemIndex property', fakeAsync(() => {
    component.gridFirstItemIndex = 527;
    component.updateFirstGridIndex(false);
    fixture.detectChanges()

    component.updateGridFirstItemIndex$.subscribe((isIncrement: boolean) => {
      expect(isIncrement).toBeFalsy();
    });
    // debounce Time
    tick(300);
    expect(component.gridFirstItemIndex).toBe(500);
  }));

  it('clicking the previous button should decrement the gridFirstItemIndex property', fakeAsync(() => {
    component.gridFirstItemIndex = 227;
    let de: DebugElement = fixture.debugElement.query(By.css('.prev'));
    let spy: jasmine.Spy = spyOn(component, 'updateFirstGridIndex').and.callThrough();

    component.updateGridFirstItemIndex$.subscribe((isIncrement: boolean) => {
      expect(isIncrement).toBeFalsy();
    });
    de.triggerEventHandler('click', false);
    // debounce Time
    tick(300);
    expect(component.gridFirstItemIndex).toBe(200);
    expect(spy).toHaveBeenCalled();
  }));

  it('clicking the more button should increment the gridFirstItemIndex property', fakeAsync(() => {
    component.gridFirstItemIndex = 40;
    let de: DebugElement = fixture.debugElement.query(By.css('.more'));
    let spy: jasmine.Spy = spyOn(component, 'updateFirstGridIndex').and.callThrough();

    component.updateGridFirstItemIndex$.subscribe((isIncrement: boolean) => {
      expect(isIncrement).toBeTruthy();
    });
    de.triggerEventHandler('click', true);
    // debounce Time
    tick(300);
    expect(component.gridFirstItemIndex).toBe(67);
    expect(spy).toHaveBeenCalled();
  }));

  it('#gridLayout settings should be used to lay out the grid', () => {
    let de: DebugElement = fixture.debugElement.query(By.directive(MatGridList));
    let el: HTMLElement = de.nativeElement;

    expect(el.getAttribute('ng-reflect-cols'))
      .withContext('angulars class name for the cols input')
      .toBe('3');

    expect(el.getAttribute('ng-reflect-row-height'))
      .withContext('angulars class name for the rowHeight input')
      .toBe('11rem');

    expect(el.getAttribute('ng-reflect-gutter-size'))
      .withContext('angulars class name for the gutterSize input')
      .toBe('1rem');
  });

  it('the grid should have 9 grid tiles which contain an item each', () => {
    let des: DebugElement[] = fixture.debugElement.queryAll(By.directive(MatGridTile));
    expect(des).not.toBeNull();
    expect(des.length).toBe(9);

    des = fixture.debugElement.queryAll(By.css('.item'));
    expect(des).not.toBeNull();
    expect(des.length).toBe(9);

  });
});
