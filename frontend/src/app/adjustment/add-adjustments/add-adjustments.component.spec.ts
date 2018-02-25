import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdjustmentsComponent } from './add-adjustments.component';

describe('AddAdjustmentsComponent', () => {
  let component: AddAdjustmentsComponent;
  let fixture: ComponentFixture<AddAdjustmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAdjustmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdjustmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
