import { AngularMaterialModule } from './../../../modules/angular-material/angular-material.module';
import { StoryType } from './../../../customtypes/story-type';
import { By } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import { DebugElement } from '@angular/core';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularMaterialModule
      ],
      declarations: [ ToolbarComponent ],
    })

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the storyTypes array', () => {
    component.isSmallerScreen = false;
    fixture.detectChanges();
    const debugEls: DebugElement[] = fixture.debugElement.queryAll(By.css('.story'));
    expect(debugEls.length).toBe(component.storyTypes.length);
    let el: HTMLElement = debugEls[0].nativeElement;
    expect(el.innerText).toEqual(component.storyTypes[0]);
    el = debugEls[component.storyTypes.length-1].nativeElement;
    expect(el.innerText).toEqual(component.storyTypes[component.storyTypes.length-1]);
  });

  it('should emit a value from storyTypeSelectEmitter when onStoryClickHandler() is invoked', () => {
    let storyType: StoryType;
    component.storyTypeSelectEmitter.subscribe((type: StoryType) => storyType = type);
    expect(storyType!).toBeUndefined();
    component.onStoryClickHandler('newstories');
    expect(storyType!).toEqual('newstories');
  });

  it('should invoke onStoryClickHandler() when a story type is click in the toolbar', () => {
    component.isSmallerScreen = false;
    fixture.detectChanges();
    let wasInvoked: boolean = false;
    spyOn(component, 'onStoryClickHandler').and.callFake(() => wasInvoked = true);
    const de: DebugElement = fixture.debugElement.queryAll(By.css('.story'))[0];
    de.triggerEventHandler('click', null);
    expect(wasInvoked).toBeTrue();
  });
});
