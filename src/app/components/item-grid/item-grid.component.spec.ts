import { GridLayoutService } from './../../services/grid-layout-service/grid-layout.service';
import { ComponentsModule } from './../components.module';
import { AngularMaterialModule } from './../../modules/angular-material/angular-material.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HackerNewsService } from 'src/app/services/hacker-news-service/hacker-news.service';
import { MockHackerNewsService } from 'src/app/testutils';
import { ItemGridComponent } from './item-grid.component';

fdescribe('ItemGridComponent', () => {
  let component: ItemGridComponent;
  let fixture: ComponentFixture<ItemGridComponent>;
  let mockHackerNewsService: MockHackerNewsService = new MockHackerNewsService();

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
        GridLayoutService
      ],
    });

    fixture = TestBed.createComponent(ItemGridComponent);
    mockHackerNewsService = new MockHackerNewsService();
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

  it('#updateFirstGridIndex() should update the updateGridFirstItemIndex$ property', () => {
    component.gridFirstItemIndex = 1000;
    component.updateFirstGridIndex(true);

    fixture.detectChanges();
  });

});
