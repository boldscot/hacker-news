import { GridLayout } from './../../model';
import { GridLayoutService } from './../../services/grid-layout-service/grid-layout.service';
import { StoryType } from './../../customtypes/story-type';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { debounceTime, Observable, Subject, takeUntil } from 'rxjs';
import { HackerNewsService } from 'src/app/services/hacker-news-service/hacker-news.service';
import { Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-item-grid',
  templateUrl: './item-grid.component.html',
  styleUrls: ['./item-grid.component.scss']
})
export class ItemGridComponent implements OnInit, OnDestroy {
  /**
   * Subject used to unsubscribe from the subscriptions to
   * gridLayoutService.observeBreakpoints() and gridFirstItemIndex$ observables.
   * @private
   * @memberof ItemGridComponent
   */
  private destroyed$: Subject<void> = new Subject();

  /**
   * Object that stores the properties that define the grid layout
   * @type {GridLayout}
   * @memberof ItemGridComponent
   */
  gridLayout: GridLayout;

  /**
   * Input setter for new story types, invokes the hackerNewsService.getStories() function
   * which returns an Observale<number[] | null> and sets the first grid index to zero
   * @memberof ItemGridComponent
   */
  @Input() set storyType(type: StoryType) {
    this.stories$ = this.hackerNewsService.getStories(type);
    this.gridFirstItemIndex = 0;
  }

  /**
   * Subject that emits the value of the new first grid position, the emission is fired
   * when the 'more' or 'previous' buttons are clicked in the ui
   * @type {Subject<number>}
   * @memberof ItemGridComponent
   */
  updateGridFirstItemIndex$: Subject<boolean> = new Subject();

  /**
   * Property that stores the new first grid position, used in the template for
   * slicing the array, disabling a button and setting the grid item number
   * @type {number}
   * @memberof ItemGridComponent
   */
  gridFirstItemIndex: number = 0;

  /**
   * Observable on the stories ids, passed to the async pipe in the template
   * @type {(Observable<number[] | null>)}
   * @memberof ItemGridComponent
   */
  stories$!: Observable<number[] | null>;

  constructor(private hackerNewsService: HackerNewsService,
    private gridLayoutService: GridLayoutService) {
    // Initializing the grid using '(min-width: 1280px) and (max-width: 1919.98px)'
    this.gridLayout = this.gridLayoutService.getGridLayout(Breakpoints.Large);
  }

  ngOnInit(): void {
    // Subscribing to the Observable<string | undefined>, updates the gridLayout property
    this.gridLayoutService.observeBreakpoints(this.gridLayoutService.getBreakPoints())
      .pipe(takeUntil(this.destroyed$))
      .subscribe((breakPoint: string | undefined) => {
        if (breakPoint) this.gridLayout = this.gridLayoutService.getGridLayout(breakPoint);
    });

    // Subscribing to the Observable<boolean>, updates the gridFirstItemIndex property
    this.updateGridFirstItemIndex$.pipe(
      debounceTime(300), // Using debounce time here to prevent repeated button presses making lots of requests
      takeUntil(this.destroyed$)
    ).subscribe((isIncrement: boolean) => {
      this.gridFirstItemIndex = isIncrement ? this.gridFirstItemIndex + this.gridLayout.gridSize
        : this.gridFirstItemIndex - this.gridLayout.gridSize;
    });
  }


  /**
   * Event handler for 'more' or 'previous' button clicks, triggers an
   * emission from the updateGridFirstItemIndex$ Subject
   * @param isIncrement Boolean flag that signals an increment or decrement in the grid index
   */
  updateFirstGridIndex(isIncrement: boolean) {
    this.updateGridFirstItemIndex$.next(isIncrement);
  }

  /**
   * Cleaning up subscriptions
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
