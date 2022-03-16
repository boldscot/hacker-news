import { Component } from '@angular/core';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent {
  /**
   * Property that is passed to the item grid component's 'storyType' input property
   * @type {('topstories' | 'newstories' | 'beststories' | 'askstories' | 'showstories' | 'jobstories')}
   * @memberof FrontPageComponent
   */
  storyType: 'topstories' | 'newstories' | 'beststories' | 'askstories' | 'showstories' | 'jobstories';

  constructor() {
    this.storyType = 'topstories';
  }

  /**
   * Event handler for the storyType emitter in the toolbar component
   * @param type The story type that was selected on the toolbar
   */
  onStoryClickHandler(type: 'topstories' | 'newstories' | 'beststories' | 'askstories' | 'showstories' | 'jobstories') {
    if (this.storyType !== type) this.storyType = type;
  }
}
