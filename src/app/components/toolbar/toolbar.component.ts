
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StoryType } from 'src/app/customtypes/story-type';
import { GridLayoutService } from 'src/app/services/grid-layout-service/grid-layout.service';

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
   * Stores the current story type
   * @type {StoryType}
   * @memberof ToolbarComponent
   */
  currentStoryType: StoryType = 'topstories';

  /**
   * Array of literal types used in the template to display them in the toolbar
   * @type {((StoryType)[])}
   * @memberof ToolbarComponent
   */
  storyTypes: StoryType[]
    = ['topstories', 'newstories', 'beststories', 'askstories', 'showstories', 'jobstories'];

  /**
   * Observable on literal string breakPoint, passed to the async pipe in the template
   * @type {(Observable<string | undefined>)}
   * @memberof ToolbarComponent
   */
  breakPoint$: Observable<string | undefined> = of('Large');

  constructor(private gridLayoutService: GridLayoutService) { }

  ngOnInit(): void {
    this.breakPoint$ = this.gridLayoutService.observeBreakpoints(this.gridLayoutService.getBreakPoints());
  }

  /**
   * Event handler for the click event on the toolbar story types
   * @param storyType The story type selected from the toolbar
   */
  onStoryClickHandler(storyType: StoryType) {
    this.currentStoryType = storyType;
    this.storyTypeSelectEmitter.emit(storyType);
  }
}
