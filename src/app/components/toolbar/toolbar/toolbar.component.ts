import { BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { GridLayoutService } from './../../../services/grid-layout-service/grid-layout.service';
import { StoryType } from './../../../customtypes/story-type';
import { Component, EventEmitter, Output, OnInit, OnDestroy, Pipe } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  /**
   * Subject used to unsubscribe from the subscription to the
   * gridLayoutService.observeBreakpoints() Observable
   * @private
   * @type {Subject<void>}
   * @memberof ToolbarComponent
   */
  private destroyed$: Subject<void> = new Subject();

  /**
   * The Event Emitter passes the emiited value to its parent
   * The Emitter emits a value when a story is selected from the toolbar
   * @type {(EventEmitter<StoryType>)}
   * @memberof ToolbarComponent
   */
  @Output() storyTypeSelectEmitter: EventEmitter<StoryType> = new EventEmitter();

  /**
   * Array of literal types used in the template to display them in the toolbar
   * @type {((StoryType)[])}
   * @memberof ToolbarComponent
   */
  storyTypes: StoryType[]
    = ['topstories', 'newstories', 'beststories', 'askstories', 'showstories', 'jobstories'];

  /**
   * Boolean flag that hides/unhides the toolbar stories and menu for smaller screen
   * @type {boolean}
   * @memberof ToolbarComponent
   */
  isSmallerScreen: boolean = false;

  constructor(private gridLayoutService: GridLayoutService) {}

  ngOnInit(): void {
    // Subscribing to the Observable<BreakpointState>, setting the isSmallerScreen property
    this.gridLayoutService.observeBreakpoints()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((state: BreakpointState) => {
        this.isSmallerScreen = (state.breakpoints[Breakpoints.XSmall] || state.breakpoints[Breakpoints.Small] ||
          state.breakpoints[Breakpoints.Medium])? true: false;
      });
  }

  /**
   * Event handler for the click event on the toolbar story types
   * @param storyType The story type selected from the toolbar
   */
  onStoryClickHandler(storyType: StoryType) {
    this.storyTypeSelectEmitter.emit(storyType);
  }

  /**
   * Clean up the subscription
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
