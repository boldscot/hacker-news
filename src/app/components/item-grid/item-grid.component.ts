import { GridLayout } from './../../model/grid-layout';
import { GridLayoutService } from './../../services/grid-layout-service/grid-layout.service';
import { StoryType } from './../../customtypes/story-type';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { debounceTime, Observable, Subject, takeUntil } from 'rxjs';
import { HackerNewsService } from 'src/app/services/hacker-news-service/hacker-news.service';
import { BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-item-grid',
  templateUrl: './item-grid.component.html',
  styleUrls: ['./item-grid.component.scss']
})
export class ItemGridComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();
  gridLayout: GridLayout;


  @Input() set storyType(type: StoryType) {
    this.stories$ = this.hackerNewsService.getStories(type);
  }


  gridFirstItemIndex$: Subject<number> = new Subject();
  gridFirstItemIndex: number = 0;
  //gridSize: number = 27;
  stories$!: Observable<number[] | null>;

  constructor(private hackerNewsService: HackerNewsService,
    private gridLayoutService: GridLayoutService) {
      this.gridLayout = this.gridLayoutService.getGridSettings('XLarge')
  }

  ngOnInit(): void {
    this.gridLayoutService.observeBreakpoints()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((state: BreakpointState) => {
        console.log(state);

        for (const query of Object.keys(state.breakpoints)) {


          if (state.breakpoints[query]) {
            console.log(query);

            this.gridLayout = this.gridLayoutService.getGridSettings(query);

          }
        }
      })



    this.gridFirstItemIndex$.pipe(
      debounceTime(300),
      takeUntil(this.destroyed$)
    ).subscribe((index: number) => this.gridFirstItemIndex = index);

    this.stories$ = this.hackerNewsService.getStories('topstories');
  }

  updateFirstGridIndex(isIncrement: boolean, minMaxIndex: number) {
    let newIndex: number = this.gridFirstItemIndex;

    if (isIncrement) {
      newIndex = this.gridFirstItemIndex + this.gridLayout.gridSize;
      newIndex = (newIndex <= minMaxIndex) ? newIndex : this.gridFirstItemIndex;
    } else {
      newIndex = this.gridFirstItemIndex - this.gridLayout.gridSize;
      newIndex = (newIndex >= minMaxIndex) ? newIndex : this.gridFirstItemIndex;
    }
    this.gridFirstItemIndex$.next(newIndex);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
