import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BrokerfeeRequest} from '../models/brokerfee.model';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class BrokerfeeService{
    
  constructor(private http: HttpClient){

  }

  createBrokerFeeRequest(brokerfeeRequest: BrokerfeeRequest): Observable<any> {
    return this.http.post(environment.apiBaseUrl + '/brokerfee', brokerfeeRequest);
  }

  getBrokerFeeRequests(isAdmin: boolean): Observable<any> {
    const path = isAdmin ? '/brokerfee' : '/brokerfee/myBrokerfeeRequests' ;
    return this.http.get(environment.apiBaseUrl + path);
  }

  getBrokerFeeRequestById(id: number): Observable<any> {
    const path = '/brokerfee/' + id ;
    return this.http.get(environment.apiBaseUrl + path);
  }

  setBrokerFeeRequestStatus(id: number, status: string, reason: string): Observable<any> {
    const url = environment.apiBaseUrl + '/brokerfee/status';
    const reqBody = { id: id, status: status, reason: reason };
    return this.http.put(url, reqBody);
  }
}