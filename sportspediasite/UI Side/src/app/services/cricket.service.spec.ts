import { TestBed } from '@angular/core/testing';

import { CricketService } from './cricket.service';

describe('CricketService', () => {
  let service: CricketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CricketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
