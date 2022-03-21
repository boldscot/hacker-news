import { GridLayout } from './../../model/grid-layout';
import { GridLayoutService } from './../../services/grid-layout-service/grid-layout.service';
import { StoryType } from './../../customtypes/story-type';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { debounceTime, Observable, skip, Subject, takeUntil } from 'rxjs';
import { HackerNewsService } from 'src/app/services/hacker-news-service/hacker-news.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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

  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  gridFirstItemIndex$: Subject<number> = new Subject();
  gridFirstItemIndex: number = 0;
  //gridSize: number = 27;
  stories$!: Observable<number[] | null>;

  constructor(private hackerNewsService: HackerNewsService,
    private gridLayoutService: GridLayoutService) {
      this.gridLayout = this.gridLayoutService.getGridSettings('XLarge')
     }

  ngOnInit(): void {
    this.gridLayoutService.observeBreakpoints([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).pipe(takeUntil(this.destroyed$))
      .subscribe(result => {
        console.log(result);

        for (const query of Object.keys(result.breakpoints)) {


          if (result.breakpoints[query]) {
            console.log(query);
            const size: string = this.displayNameMap.get(query) ?? 'Unknown';
            this.gridLayout = this.gridLayoutService.getGridSettings(size);

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
