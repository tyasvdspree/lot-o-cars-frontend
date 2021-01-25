import {inject, TestBed} from '@angular/core/testing';

import { RegisterService } from './register.service';

describe('RegisterService', () => {
  let service: RegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have register function', inject([RegisterService], (service: RegisterService) => {
    expect(service.register).toBeTruthy();
  }));

  it('should have checkIfUsernameExists function', inject([RegisterService], (service: RegisterService) => {
    expect(service.checkIfUsernameExists).toBeTruthy();
  }));

  it('should have checkIfEmailAddressExistsAtRegistration function', inject([RegisterService], (service: RegisterService) => {
    expect(service.checkIfEmailAddressExistsAtRegistration).toBeTruthy();
  }));
});
