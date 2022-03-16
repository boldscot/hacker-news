import { StoryType } from './../../customtypes/story-type';
import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, debounceTime, max, Observable, skip } from 'rxjs';
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

  gridFirstItemIndex$: BehaviorSubject<number> = new BehaviorSubject(0);
  gridFirstItemIndex: number = 0;
  gridSize: number = 30;
  stories$!: Observable<number[] | null>;

  constructor(private hackerNewsService: HackerNewsService) { }

  ngOnInit(): void {
    this.gridFirstItemIndex$.pipe(
      skip(1),
      debounceTime(300)
    ).subscribe((index: number) => {
      this.gridFirstItemIndex = index
    });

    this.stories$ = this.hackerNewsService.getStories('topstories');
  }

  updateFirstGridIndex(isIncrement: boolean, minMaxIndex: number) {
    const currentIndex: number = this.gridFirstItemIndex;
    let newIndex: number = currentIndex;

    if (isIncrement) {
      newIndex = currentIndex + this.gridSize;
      newIndex = (newIndex <= minMaxIndex)? newIndex: currentIndex;
    } else {
      newIndex= this.gridFirstItemIndex - this.gridSize;
      newIndex = (newIndex >= minMaxIndex)? newIndex: currentIndex;
    }
    this.gridFirstItemIndex$.next(newIndex);
  }

  decrementFirstIndex() {
    this.gridFirstItemIndex$.next(this.gridFirstItemIndex$.getValue() - this.gridSize);
  }
}
