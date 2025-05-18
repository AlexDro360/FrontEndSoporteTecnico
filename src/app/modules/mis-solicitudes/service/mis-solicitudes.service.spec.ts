import { TestBed } from '@angular/core/testing';

import { MisSolicitudesService } from './mis-solicitudes.service';

describe('MisSolicitudesService', () => {
  let service: MisSolicitudesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MisSolicitudesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
