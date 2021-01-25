import {inject, TestBed} from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have getUser function', inject([UserService], (service: UserService) => {
    expect(service.getUser).toBeTruthy();
  }));

  it('should have editUser function', inject([UserService], (service: UserService) => {
    expect(service.editUser).toBeTruthy();
  }));

  it('should have checkIfEmailAddressExists function', inject([UserService], (service: UserService) => {
    expect(service.checkIfEmailAddressExists).toBeTruthy();
  }));
});
