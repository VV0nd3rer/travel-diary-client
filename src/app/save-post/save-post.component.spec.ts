import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavePostComponent } from './save-post.component';

describe('SavePostComponent', () => {
  let component: SavePostComponent;
  let fixture: ComponentFixture<SavePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
