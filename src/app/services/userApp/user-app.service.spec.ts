import { TestBed } from '@angular/core/testing';

import { UserAppService } from './user-app.service';

describe('UserAppService', () => {
  let service: UserAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
