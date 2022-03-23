import { PipesModule } from './../../../pipes/pipes.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { ItemComponent } from './../../item-component/item/item.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MockHackerNewsService } from './../../../testutils/mock-hacker-news-service';
import { HackerNewsService } from './../../../services/hacker-news-service/hacker-news.service';
import { ItemGridComponent } from './../../item-grid/item-grid.component';
import { ToolbarComponent } from './../../toolbar/toolbar/toolbar.component';
import { StoryType } from './../../../customtypes/story-type';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontPageComponent } from './front-page.component';

describe('FrontPageComponent', () => {
  let component: FrontPageComponent;
  let fixture: ComponentFixture<FrontPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        FrontPageComponent,
        ToolbarComponent,
        ItemGridComponent,
        ItemComponent
      ],
      providers: [
        {provide: HackerNewsService, useClass: MockHackerNewsService}
      ],
      imports: [
        MatToolbarModule,
        MatIconModule,
        MatGridListModule,
        PipesModule
      ]
    });

    fixture = TestBed.createComponent(FrontPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the storyType when onStoryClickHandler() is invoked', () => {
    const jobStory: StoryType = 'jobstories';
    expect(component.storyType)
      .withContext('should be initialised as "topstories"')
      .toEqual('topstories');
    component.onStoryClickHandler(jobStory);
    expect(component.storyType).toEqual(jobStory);
  });
});
