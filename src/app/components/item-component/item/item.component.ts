import { HackerNewsService } from './../../../services/hacker-news-service/hacker-news.service';
import { Component, Input } from '@angular/core';
import { Item } from 'src/app/model/item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  @Input() set itemId(value: number) {
    this.getItem(value);
  }
  item: Item | null = null;

  constructor(private hackerNewsService: HackerNewsService) { }

  getItem(itemId: number) {
    this.hackerNewsService.getItem(itemId)
      .subscribe((newItem: Item | null) => this.item = newItem);
  }

}
