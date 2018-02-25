import { TestBed, inject } from '@angular/core/testing';

import { TeacherTtServiceService } from './teacher-tt-service.service';

describe('TeacherTtServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeacherTtServiceService]
    });
  });

  it('should be created', inject([TeacherTtServiceService], (service: TeacherTtServiceService) => {
    expect(service).toBeTruthy();
  }));
});
