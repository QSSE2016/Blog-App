import { TestBed } from '@angular/core/testing';

import { ClientInfoService } from './client-info.service';

describe('ClientInfoService', () => {
  let service: ClientInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
