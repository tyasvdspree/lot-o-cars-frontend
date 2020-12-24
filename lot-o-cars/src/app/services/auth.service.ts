import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LoginRequestPayload } from '../components/login/login-request.payload';
import { LoginResponse } from '../components/login/login-response.payload';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  };

  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService,
    private toastr: ToastrService
  ) { }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient.post<LoginResponse>(environment.apiBaseUrl + '/login',
      loginRequestPayload).pipe(map(data => {
        if (!data.authenticationToken) {
          return false;
        }
        this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('username', data.username);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);

        this.loggedIn.emit(true);
        this.username.emit(data.username);
        return true;
      }));
  }

  getJwtToken(): any {
    return this.localStorage.retrieve('authenticationToken');
  }

  refreshToken(): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(environment.apiBaseUrl + '/refresh/token',
      this.refreshTokenPayload)
      .pipe(tap(response => {
        this.localStorage.clear('authenticationToken');
        this.localStorage.clear('expiresAt');

        this.localStorage.store('authenticationToken',
          response.authenticationToken);
        this.localStorage.store('expiresAt', response.expiresAt);
      }));
  }

  logout(): void {
    this.httpClient.post(environment.apiBaseUrl + '/logout/', this.refreshTokenPayload,
      { responseType: 'text' })
      .subscribe(data => {
        this.toastr.info('Afgemeld');
      }, error => {
        throwError(error);
      });
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
  }

  getUserName(): any {
    return this.localStorage.retrieve('username');
  }
  getRefreshToken(): any {
    return this.localStorage.retrieve('refreshToken');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
}
