import { StoryType } from './../../customtypes/story-type';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HackerNewsService } from 'src/app/services/hacker-news-service/hacker-news.service';

@Component({
  selector: 'app-item-grid',
  templateUrl: './item-grid.component.html',
  styleUrls: ['./item-grid.component.scss']
})
export class ItemGridComponent implements OnInit {
  @Input() set storyType(type: StoryType) {
    this.stories$ = this.hackerNewsService.getStories(type);
  }

  colour: string = '#2c9edad1';
  border: string = 'solid white 1px';

  gridSize: number = 30;
  gridFirstItemIndex: number = 0;

  stories$!: Observable<number[] | null>;

  constructor(private hackerNewsService: HackerNewsService) { }

  ngOnInit(): void {
    this.stories$ = this.hackerNewsService.getStories('topstories');
  }

  incrementIndexs() {
    this.gridFirstItemIndex+=this.gridSize;
  }

}
