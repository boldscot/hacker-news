import { map } from 'rxjs/operators';
import { BreakpointState } from '@angular/cdk/layout';
import { GridLayoutService } from './../../../services/grid-layout-service/grid-layout.service';
import { StoryType } from './../../../customtypes/story-type';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
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

  breakPoint$!: Observable<string | undefined>;

  constructor(private gridLayoutService: GridLayoutService) {}

  ngOnInit(): void {
    this.breakPoint$ = this.gridLayoutService.observeBreakpoints()
      .pipe(
        map((state: BreakpointState) => {
          for (const query of Object.keys(state.breakpoints)) {
            if (state.breakpoints[query]) {
              return this.gridLayoutService.getbreakpointMapping(query);
            }
          }
          return undefined;
        })
      )
  }

  /**
   * Event handler for the click event on the toolbar story types
   * @param storyType The story type selected from the toolbar
   */
  onStoryClickHandler(storyType: StoryType) {
    this.storyTypeSelectEmitter.emit(storyType);
  }
}
