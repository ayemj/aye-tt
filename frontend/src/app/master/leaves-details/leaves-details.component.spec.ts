import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavesDetailsComponent } from './leaves-details.component';

describe('LeavesDetailsComponent', () => {
  let component: LeavesDetailsComponent;
  let fixture: ComponentFixture<LeavesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeavesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeavesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
