import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LivechangeComponent } from './livechange.component';

describe('LivechangeComponent', () => {
  let component: LivechangeComponent;
  let fixture: ComponentFixture<LivechangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivechangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivechangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
