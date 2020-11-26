import { TestBed } from '@angular/core/testing';

import { CarsearchService } from './carsearch.service';

describe('CarsearchService', () => {
  let service: CarsearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarsearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
