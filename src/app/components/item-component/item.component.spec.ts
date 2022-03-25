import { MatIconModule } from '@angular/material/icon';
import { HackerNewsService } from 'src/app/services/hacker-news-service/hacker-news.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemComponent } from './item.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MockHackerNewsService } from 'src/app/testutils';
import { PipesModule } from 'src/app/pipes/pipes.module';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;
  let mockHackerNewsService: MockHackerNewsService = new MockHackerNewsService();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        PipesModule,
        MatIconModule
      ],
      providers: [
        { provide: HackerNewsService, useValue: mockHackerNewsService }
      ],
      declarations: [ ItemComponent ]
    });

    mockHackerNewsService = new MockHackerNewsService();
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invoke the getItem() function when the itemId setter is populated', () => {
    let wasInvoked: boolean = false;
    spyOn(component, 'getItem').and.callFake(() => wasInvoked = true);
    expect(wasInvoked).toBeFalsy();
    component.itemId = 1;
    fixture.detectChanges();
    expect(wasInvoked).toBeTruthy();
  });

  it('should populate the item$ observable when the itemId setter is populated', () => {
    component.item$.subscribe(data => expect(data).toBeNull());
    component.itemId = 1;
    component.item$.subscribe(data => {
      expect(data).not.toBeNull();
      expect(data?.id).toBe(1);
      expect(data?.type).toEqual('story');
      expect(data?.title?.toLowerCase()).toContain('story item')
    });
    component.itemId = 3;
    component.item$.subscribe(data => expect(data).toBeNull());
  });

  it('#itemNumber should be rendered when > 0',  () => {
    component.itemId = 1; // An item object is required or nothing will be present in the dom
    fixture.detectChanges();

    expect(component.itemNumber).toBe(0);
    let de: DebugElement = fixture.debugElement.query(By.css('.item-number'));
    expect(de).withContext('Should not be in the dom, itemNumber = 0').toBeNull();

    const itemNumber = 200;
    component.itemNumber = itemNumber;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('.item-number'));
    const el: HTMLElement = de.nativeElement;
    expect(de).withContext('Should be in the dom, itemNumber > 0').not.toBeNull();
    expect(el.innerText).toContain(`${itemNumber}`)
  });

  it('should render the item properties', () => {
    const item = mockHackerNewsService.mockItem;
    component.itemId = 1;
    fixture.detectChanges();
    let de: DebugElement = fixture.debugElement.query(By.css('.title'));
    expect(de).not.toBeNull();
    let el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain(item.title!);
    expect(el.innerText).toContain((new URL(item.url!)).hostname.replace('www.',''));

    de = fixture.debugElement.query(By.css('.contrib'));
    expect(de).not.toBeNull();
    el = de.nativeElement;
    expect(el.innerText).toContain(`${item!.by}`);
    expect(el.innerText).toContain('1/20/70, 2:47 AM');

    de = fixture.debugElement.query(By.css('.score'));
    expect(de).not.toBeNull();
    el = de.nativeElement;
    expect(el.innerHTML).withContext('should have a material icon').toContain('mat-icon');
    expect(el.innerText).toContain(`${item!.score}`);

    de = fixture.debugElement.query(By.css('.comment'));
    expect(de).not.toBeNull();
    el = de.nativeElement;
    expect(el.innerHTML).withContext('should have a material icon').toContain('mat-icon');
    expect(el.innerText).toContain(`${item!.descendants}`);
  })
});
