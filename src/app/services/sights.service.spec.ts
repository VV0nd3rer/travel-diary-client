import { TestBed } from '@angular/core/testing';

import { SightsService } from './sights.service.ts';

describe('SightsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SightsService = TestBed.get(SightsService);
    expect(service).toBeTruthy();
  });
});
