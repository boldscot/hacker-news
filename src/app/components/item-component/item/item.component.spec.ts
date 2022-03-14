import { MockHackerNewsService } from './../../../testutils/mock-hacker-news-service';
import { HackerNewsService } from 'src/app/services/hacker-news-service/hacker-news.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemComponent } from './item.component';

fdescribe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HackerNewsService, useClass: MockHackerNewsService }
      ],
      declarations: [ ItemComponent ]
    });

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
});
