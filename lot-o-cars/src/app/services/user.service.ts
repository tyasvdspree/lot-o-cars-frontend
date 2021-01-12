import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(): Observable<User>{
    return this.http.get<User>(environment.apiBaseUrl + "/user/me");
  }

  editUser(user){
    console.log("user.service.ts / editUser")
    return this.http.put(environment.apiBaseUrl + "/user/editme", user);
  }

  checkIfEmailAddressExists(userId, userEmailAddress){
    console.log("user.service.ts / userid=" + userId + "emailAddress=" + userEmailAddress)
    return this.http.get(environment.apiBaseUrl + "/user/checkUserEmailAddress" + "?userId=" + userId + "&userEmailAddress=" + userEmailAddress);
  }
}
