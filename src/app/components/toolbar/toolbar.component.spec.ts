
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolbarComponent } from './toolbar.component';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoryType } from 'src/app/customtypes/story-type';
import { AngularMaterialModule } from 'src/app/modules/angular-material/angular-material.module';
import { GridLayoutService } from 'src/app/services/grid-layout-service/grid-layout.service';
import { MockGridLayoutService } from 'src/app/testutils/mock-grid-layout-service';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let mockGridLayoutService: MockGridLayoutService = new MockGridLayoutService();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularMaterialModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: GridLayoutService, useValue: mockGridLayoutService }
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
    component.breakPoint$ = of('Large');
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
    component.breakPoint$ = of('Large');
    fixture.detectChanges();
    spyOn(component, 'onStoryClickHandler');
    const de: DebugElement = fixture.debugElement.queryAll(By.css('.story'))[0];
    de.triggerEventHandler('click', null);
    expect(component.onStoryClickHandler).toHaveBeenCalled();
  });

  it('should invoke onStoryClickHandler() when a story type is click in the toolbar menu', () => {
    // Using Medium size to get the menu into the DOM
    component.breakPoint$ = of('Medium');
    fixture.detectChanges();
    spyOn(component, 'onStoryClickHandler');
    const de: DebugElement = fixture.debugElement.query(By.css('.menu-bttn'));
    de.triggerEventHandler('click', null);
    const deArray: DebugElement[] = fixture.debugElement.queryAll(By.css('.menu-item'));
    deArray[0].triggerEventHandler('click', null);
    expect(component.onStoryClickHandler).toHaveBeenCalled();
    deArray[deArray.length-1].triggerEventHandler('click', null);
    expect(component.onStoryClickHandler).toHaveBeenCalled();
  });
});
