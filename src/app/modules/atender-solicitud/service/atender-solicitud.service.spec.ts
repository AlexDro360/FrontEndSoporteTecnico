import { TestBed } from '@angular/core/testing';

import { AtenderSolicitudService } from './atender-solicitud.service';

describe('AtenderSolicitudService', () => {
  let service: AtenderSolicitudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtenderSolicitudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
