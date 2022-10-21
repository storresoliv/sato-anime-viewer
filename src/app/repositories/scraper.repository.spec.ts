import { TestBed } from '@angular/core/testing';

import { ScraperRepository } from './scraper.repository';

describe('ScraperRepositoryService', () => {
  let service: ScraperRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScraperRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
