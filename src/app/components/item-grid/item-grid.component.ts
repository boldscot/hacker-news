import { GridLayout } from './../../model/grid-layout';
import { GridLayoutService } from './../../services/grid-layout-service/grid-layout.service';
import { StoryType } from './../../customtypes/story-type';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { debounceTime, Observable, Subject, takeUntil } from 'rxjs';
import { HackerNewsService } from 'src/app/services/hacker-news-service/hacker-news.service';
import { Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-item-grid',
  templateUrl: './item-grid.component.html',
  styleUrls: ['./item-grid.component.scss']
})
export class ItemGridComponent implements OnInit, OnDestroy {
  /**
   * Subject used to unseubscribe from the subscriptions to
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
   * which returns an Observale<number[] | null>
   * @memberof ItemGridComponent
   */
  @Input() set storyType(type: StoryType) {
    this.stories$ = this.hackerNewsService.getStories(type);
  }

  /**
   * Subject that emits the value of the new first grid position, the emission is fired
   * when the 'more' or 'previous' buttons are clicked in the ui
   * @type {Subject<number>}
   * @memberof ItemGridComponent
   */
  gridFirstItemIndex$: Subject<number> = new Subject();

  /**
   * Property that stores the new first grid position, used in the template for
   * slicing the array, disabling a button and setting the grid item number
   * @type {number}
   * @memberof ItemGridComponent
   */
  gridFirstItemIndex: number = 0;

  /**
   * Observabel on the stories ids, passed to the async pipe in the template
   * @type {(Observable<number[] | null>)}
   * @memberof ItemGridComponent
   */
  stories$!: Observable<number[] | null>;

  constructor(private hackerNewsService: HackerNewsService,
    private gridLayoutService: GridLayoutService) {
    // Initializing the grid using 1920px max screen
    this.gridLayout = this.gridLayoutService.getGridSettings(Breakpoints.Large);
  }

  ngOnInit(): void {
    this.gridLayoutService.observeBreakpoints()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((state: BreakpointState) => {
        for (const query of Object.keys(state.breakpoints)) {
          if (state.breakpoints[query]) {
            this.gridLayout = this.gridLayoutService.getGridSettings(query);
          }
        }
      });

    this.gridFirstItemIndex$.pipe(
      debounceTime(300), // Using debounce time here to prevent repeated button presses making lots of requests
      takeUntil(this.destroyed$)
    ).subscribe((index: number) => this.gridFirstItemIndex = index);
  }

  /**
   *
   * @param isIncrement
   * @param minMaxIndex
   */
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

  /**
   * Cleaning up subscriptions
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
