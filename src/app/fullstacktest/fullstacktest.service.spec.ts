import { TestBed } from '@angular/core/testing';

import { FullstacktestService } from './fullstacktest.service';

describe('FullstacktestService', () => {
  let service: FullstacktestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FullstacktestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
