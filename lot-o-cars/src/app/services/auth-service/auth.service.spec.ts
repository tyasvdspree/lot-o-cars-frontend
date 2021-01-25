import {inject, TestBed} from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have login function', inject([AuthService], (service: AuthService) => {
    expect(service.login).toBeTruthy();
  }));

  it('should have getJwtToken function', inject([AuthService], (service: AuthService) => {
    expect(service.getJwtToken).toBeTruthy();
  }));

  it('should have refreshToken function', inject([AuthService], (service: AuthService) => {
    expect(service.refreshToken).toBeTruthy();
  }));

  it('should have logout function', inject([AuthService], (service: AuthService) => {
    expect(service.logout).toBeTruthy();
  }));

  it('should have getUserName function', inject([AuthService], (service: AuthService) => {
    expect(service.getUserName).toBeTruthy();
  }));

  it('should have getRefreshToken function', inject([AuthService], (service: AuthService) => {
    expect(service.getRefreshToken).toBeTruthy();
  }));

  it('should have isLoggedIn function', inject([AuthService], (service: AuthService) => {
    expect(service.isLoggedIn).toBeTruthy();
  }));
});
