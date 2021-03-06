import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  public register(user): Observable<any> {
    return this.http.post(environment.apiBaseUrl + '/user', user);
  }

  public checkIfUsernameExists(username): Observable<any> {
    return this.http.get(environment.apiBaseUrl + '/user/checkUsername' + '?username=' + username);
  }

  public checkIfEmailAddressExistsAtRegistration(userEmailAddress): Observable<any> {
    return this.http.get(environment.apiBaseUrl + '/user/checkIfEmailAddressExistsAtRegistration' + '?userEmailAddress=' + userEmailAddress);
  }
}
