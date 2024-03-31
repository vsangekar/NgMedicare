import { TestBed } from '@angular/core/testing';

import { DoctordropdownService } from './doctordropdown.service';

describe('DoctordropdownService', () => {
  let service: DoctordropdownService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctordropdownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
