import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferencePostComponent } from './preference-post.component';

describe('PreferencePostComponent', () => {
  let component: PreferencePostComponent;
  let fixture: ComponentFixture<PreferencePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferencePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferencePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
