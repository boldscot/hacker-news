import { Component } from '@angular/core';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent {
  storyType: 'topstories' | 'newstories' | 'beststories' | 'askstories' | 'showstories' | 'jobstories';

  constructor() {
    this.storyType = 'topstories';
  }

  onStoryClickHandler(type: 'topstories' | 'newstories' | 'beststories' | 'askstories' | 'showstories' | 'jobstories') {
    if (this.storyType !== type) this.storyType = type;
  }
}
