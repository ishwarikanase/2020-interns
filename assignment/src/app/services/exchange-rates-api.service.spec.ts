import { TestBed } from '@angular/core/testing';

import { ExchangeRatesAPIService } from './exchange-rates-api.service';

describe('ExchangeRatesAPIService', () => {
  let service: ExchangeRatesAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExchangeRatesAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
