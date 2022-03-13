import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HackerNewsService } from 'src/app/services/hacker-news-service/hacker-news.service';

@Component({
  selector: 'app-item-grid',
  templateUrl: './item-grid.component.html',
  styleUrls: ['./item-grid.component.scss']
})
export class ItemGridComponent implements OnInit {
  colour: string = '#00213b';
  border: string = 'solid white 2px';

  gridSize: number = 30;
  gridFirstItemIndex: number = 0;
  gridLastItemIndex: number = this.gridFirstItemIndex + this.gridSize;

  stories$!: Observable<number[] | null>;

  constructor(private hackerNewsService: HackerNewsService) { }

  ngOnInit(): void {
    this.stories$ = this.hackerNewsService.getStories('newstories');
  }

  incrementIndexs() {
    this.gridFirstItemIndex+=this.gridSize;
    this.gridLastItemIndex+=this.gridSize;
  }

}
