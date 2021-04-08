import { TestBed } from '@angular/core/testing';

import { ButtonServicesService } from './button-services.service';

describe('ButtonServicesService', () => {
  let service: ButtonServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ButtonServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
