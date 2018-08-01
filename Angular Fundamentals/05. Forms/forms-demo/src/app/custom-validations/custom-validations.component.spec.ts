import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomValidationsComponent } from './custom-validations.component';

describe('CustomValidationsComponent', () => {
  let component: CustomValidationsComponent;
  let fixture: ComponentFixture<CustomValidationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomValidationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomValidationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
