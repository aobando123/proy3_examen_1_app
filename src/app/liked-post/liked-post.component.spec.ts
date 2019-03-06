import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedPostComponent } from './liked-post.component';

describe('LikedPostComponent', () => {
  let component: LikedPostComponent;
  let fixture: ComponentFixture<LikedPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikedPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikedPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
