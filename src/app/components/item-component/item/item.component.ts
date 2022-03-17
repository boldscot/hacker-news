import { HackerNewsService } from './../../../services/hacker-news-service/hacker-news.service';
import { Component, Input } from '@angular/core';
import { Item } from 'src/app/model/item';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  /**
   * Input property of the items number, position in the array of item numbers + 1
   * @type {number}
   * @memberof ItemComponent
   */
  @Input() itemNumber: number = 0;

  /**
   * Input setter function, takes an item id as its param and
   * invokes the getItem() function
   * @param value The id of an item to get from the Hacker News Server
   * @memberof ItemComponent
   */
  @Input() set itemId(value: number) {
    this.getItem(value);
  }

  /**
   * Observable of Item object, passed to the async pipe in the template
   * @type {(Observable<Item | null>)}
   * @memberof ItemComponent
   */
  item$: Observable<Item | null> = of(null);

  constructor(private hackerNewsService: HackerNewsService) { }

  /**
   * Function that invokes the HackerNewsService.getItem() function and
   * populates the item property.
   * @param itemId The id of the item to get from the Hacker News Server
   */
  getItem(itemId: number) {
    this.item$ = this.hackerNewsService.getItem(itemId);
  }
}
