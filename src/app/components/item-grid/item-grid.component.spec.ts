import { MockGridLayoutService } from './../../testutils/mock-grid-layout-service';
import { GridLayoutService } from './../../services/grid-layout-service/grid-layout.service';
import { ComponentsModule } from './../components.module';
import { AngularMaterialModule } from './../../modules/angular-material/angular-material.module';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HackerNewsService } from 'src/app/services/hacker-news-service/hacker-news.service';
import { MockHackerNewsService } from 'src/app/testutils';
import { ItemGridComponent } from './item-grid.component';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate the stories$ Observable and set the gridFirstItemIndex to zero', () => {
    expect(component.gridFirstItemIndex).withContext('is initialised to 0').toBe(0);
    component.gridFirstItemIndex = 100;
    component.storyType =  'newstories';
    fixture.detectChanges();
    expect(component.gridFirstItemIndex).toBe(0);
    component.stories$.subscribe((ids: number[] | null)  => {
      expect(ids).toEqual([1,2,3,4,5,6,7,8,9])
    });
  });

  it('#updateFirstGridIndex() should increment the updateGridFirstItemIndex$ property', fakeAsync (() => {
    component.gridFirstItemIndex = 1000;
    component.gridLayout = mockGridLayoutService.getGridLayout();
    component.updateFirstGridIndex(true);
    fixture.detectChanges()

    component.updateGridFirstItemIndex$.subscribe((isIncrement: boolean) => {
      expect(isIncrement).toBeTruthy();
    });
    // debounce Time
    tick(300);
    expect(component.gridFirstItemIndex).toBe(1027);
  }));

  it('#updateFirstGridIndex() should decrement the updateGridFirstItemIndex$ property', fakeAsync (() => {
    component.gridFirstItemIndex = 527;
    component.gridLayout = mockGridLayoutService.getGridLayout();
    component.updateFirstGridIndex(false);
    fixture.detectChanges()

    component.updateGridFirstItemIndex$.subscribe((isIncrement: boolean) => {
      expect(isIncrement).toBeFalsy();
    });
    // debounce Time
    tick(300);
    expect(component.gridFirstItemIndex).toBe(500);
  }));


});
