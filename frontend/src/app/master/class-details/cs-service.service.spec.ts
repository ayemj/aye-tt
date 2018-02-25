import { TestBed, inject } from '@angular/core/testing';

import { CsServiceService } from './cs-service.service';

describe('CsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CsServiceService]
    });
  });

  it('should be created', inject([CsServiceService], (service: CsServiceService) => {
    expect(service).toBeTruthy();
  }));
});
