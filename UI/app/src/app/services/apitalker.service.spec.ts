import { TestBed } from '@angular/core/testing';

import { APITalkerService } from './apitalker.service';

describe('APITalkerService', () => {
  let service: APITalkerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APITalkerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
