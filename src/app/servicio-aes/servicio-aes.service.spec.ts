import { TestBed } from '@angular/core/testing';

import { ServicioAesService } from './servicio-aes.service';

describe('ServicioAesService', () => {
  let service: ServicioAesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioAesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
