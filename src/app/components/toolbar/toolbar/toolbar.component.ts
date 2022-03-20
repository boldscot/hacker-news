import { StoryType } from './../../../customtypes/story-type';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  /**
   * The Event Emitter passes the emiited value to its parent
   * The Emitter emits a value when a story is selected from the toolbar
   * @type {(EventEmitter<StoryType>)}
   * @memberof ToolbarComponent
   */
  @Output() storyTypeSelectEmitter: EventEmitter<StoryType> = new EventEmitter();

  /**
   * Array of literal types used in the temnpate to display them in the toolbar
   * @type {((StoryType)[])}
   * @memberof ToolbarComponent
   */
  storyTypes: StoryType[]
    = ['topstories' , 'newstories' , 'beststories' , 'askstories' , 'showstories' , 'jobstories'];

  constructor() {}

  /**
   * Event handler for the click event on the toolbar story types
   * @param storyType The story type selected from the toolbar
   */
  onStoryClickHandler(storyType: StoryType) {
    this.storyTypeSelectEmitter.emit(storyType);
  }
}
