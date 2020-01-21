import { TestBed } from '@angular/core/testing';

import { SolucionesService } from './soluciones.service';

describe('SolucionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SolucionesService = TestBed.get(SolucionesService);
    expect(service).toBeTruthy();
  });
});
