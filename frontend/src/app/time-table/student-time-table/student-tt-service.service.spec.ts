import { TestBed, inject } from '@angular/core/testing';

import { StudentTtServiceService } from './student-tt-service.service';

describe('StudentTtServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentTtServiceService]
    });
  });

  it('should be created', inject([StudentTtServiceService], (service: StudentTtServiceService) => {
    expect(service).toBeTruthy();
  }));
});
