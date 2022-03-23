import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FrontPageComponent } from './front-page.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StoryType } from 'src/app/customtypes/story-type';

describe('FrontPageComponent', () => {
  let component: FrontPageComponent;
  let fixture: ComponentFixture<FrontPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontPageComponent ],
      schemas: [NO_ERRORS_SCHEMA],
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
