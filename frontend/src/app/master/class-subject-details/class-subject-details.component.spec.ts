import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassSubjectDetailsComponent } from './class-subject-details.component';

describe('ClassSubjectDetailsComponent', () => {
  let component: ClassSubjectDetailsComponent;
  let fixture: ComponentFixture<ClassSubjectDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassSubjectDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassSubjectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
