import { TestBed } from '@angular/core/testing';

import { RegistroLandingService } from './registro-landing.service';

describe('RegistroLandingService', () => {
  let service: RegistroLandingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroLandingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
