import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hacker-news';
  storyType: 'topstories' | 'newstories' | 'beststories' | 'askstories' | 'showstories' | 'jobstories';

  constructor() {
    this.storyType = 'topstories';
  }

  onStoryClickHandler(type: 'topstories' | 'newstories' | 'beststories' | 'askstories' | 'showstories' | 'jobstories') {
    if (this.storyType !== type) this.storyType = type;
  }
}
