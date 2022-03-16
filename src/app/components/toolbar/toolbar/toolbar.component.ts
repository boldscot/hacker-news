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
   * @type {(EventEmitter<'topstories' | 'newstories' | 'beststories' | 'askstories' | 'showstories' | 'jobstories'>)}
   * @memberof ToolbarComponent
   */
  @Output() storyTypeSelectEmitter: EventEmitter<'topstories' | 'newstories' | 'beststories' | 'askstories' | 'showstories' | 'jobstories'>;

  /**
   * Array of literal types used in the temnpate to display them in the toolbar
   * @type {(('topstories' | 'newstories' | 'beststories' | 'askstories' | 'showstories' | 'jobstories')[])}
   * @memberof ToolbarComponent
   */
  storyTypes: ('topstories' | 'newstories' | 'beststories' | 'askstories' | 'showstories' | 'jobstories')[]
    = ['topstories' , 'newstories' , 'beststories' , 'askstories' , 'showstories' , 'jobstories'];

  constructor() {
    this.storyTypeSelectEmitter = new EventEmitter();
  }

  /**
   * Event handler for the click event on the toolbar story types
   * @param storyType The story type selected from the toolbar
   */
  onStoryClickHandler(storyType: 'topstories' | 'newstories' | 'beststories' | 'askstories' | 'showstories' | 'jobstories') {
    this.storyTypeSelectEmitter.emit(storyType);
  }
}
