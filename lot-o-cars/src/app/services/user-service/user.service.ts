import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public getUser(): Observable<User> {
    return this.http.get<User>(environment.apiBaseUrl + '/user/me');
  }

  public editUser(user): Observable<any> {
    return this.http.put(environment.apiBaseUrl + '/user/editme', user);
  }

  public checkIfEmailAddressExists(userId, userEmailAddress): Observable<any> {
    return this.http.get(environment.apiBaseUrl + '/user/checkUserEmailAddress' + '?userId=' + userId + '&userEmailAddress=' + userEmailAddress);
  }
}
