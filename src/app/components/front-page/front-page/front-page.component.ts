import { StoryType } from './../../../customtypes/story-type';
import { Component } from '@angular/core';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent {
  /**
   * Property that is passed to the item grid component's 'storyType' input property
   * @type {(StoryType)}
   * @memberof FrontPageComponent
   */
  storyType: StoryType = 'topstories';

  constructor() {}

  /**
   * Event handler for the storyType emitter in the toolbar component
   * @param type The story type that was selected on the toolbar
   */
  onStoryClickHandler(type: StoryType) {
    if (this.storyType !== type) this.storyType = type;
  }
}
