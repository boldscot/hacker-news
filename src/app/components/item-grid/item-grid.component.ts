import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HackerNewsService } from 'src/app/services/hacker-news-service/hacker-news.service';

@Component({
  selector: 'app-item-grid',
  templateUrl: './item-grid.component.html',
  styleUrls: ['./item-grid.component.scss']
})
export class ItemGridComponent implements OnInit {
  colour: string = '#2c9edad1';
  border: string = 'solid white 1px';

  gridSize: number = 27;
  gridFirstItemIndex: number = 0;
  gridLastItemIndex: number = this.gridFirstItemIndex + this.gridSize;

  stories$!: Observable<number[] | null>;

  constructor(private hackerNewsService: HackerNewsService) { }

  ngOnInit(): void {
    const url = 'https://www.mydomain.com/blog?search=hello&world';
const domain = (new URL(url)).hostname.replace('www.','');
console.log(domain);

    this.stories$ = this.hackerNewsService.getStories('topstories');
  }

  incrementIndexs() {
    this.gridFirstItemIndex+=this.gridSize;
    this.gridLastItemIndex+=this.gridSize;
  }

}
