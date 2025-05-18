import { TestBed } from '@angular/core/testing';

import { ConfigAdicionalesService } from './config-adicionales.service';

describe('ConfigAdicionalesService', () => {
  let service: ConfigAdicionalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigAdicionalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
