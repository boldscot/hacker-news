import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Output() storyTypeSelectEmitter: EventEmitter<'topstories' | 'newstories' | 'beststories' | 'askstories' | 'showstories' | 'jobstories'>;
  storyTypes: ('topstories' | 'newstories' | 'beststories' | 'askstories' | 'showstories' | 'jobstories')[]
    = ['topstories' , 'newstories' , 'beststories' , 'askstories' , 'showstories' , 'jobstories'];

  constructor() {
    this.storyTypeSelectEmitter = new EventEmitter();
  }

  onStoryClickHandler(storyType: 'topstories' | 'newstories' | 'beststories' | 'askstories' | 'showstories' | 'jobstories') {
    this.storyTypeSelectEmitter.emit(storyType);
  }
}
