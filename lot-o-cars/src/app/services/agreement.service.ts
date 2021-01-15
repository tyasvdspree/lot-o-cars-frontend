import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Agreement} from '../models/agreement.model';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AgreementService {

  constructor(private http: HttpClient) { }

  createAgreement(agreement: Agreement): Observable<any> {
    return this.http.post(environment.apiBaseUrl + '/agreement', agreement);
  }

  getAgreements(renterPerspective: boolean): Observable<any> {
    const path = renterPerspective ? '/agreement?renter=' + renterPerspective : '/agreement';
    return this.http.get(environment.apiBaseUrl + path);
  }

  getAgreementById(id: number): Observable<any> {
    const path = '/agreement/id/' + id ;
    return this.http.get(environment.apiBaseUrl + path);
  }

  setAgreementStatus(id: number, status: string, reason: string): Observable<any> {
    const url = environment.apiBaseUrl + '/agreement/status';
    const reqBody = { id: id, status: status, reason: reason };
    return this.http.put(url, reqBody);
  }

  getDashboardAgreements(userName: string, startYear: number, endYear: number): Observable<any> {
    const url = `${environment.apiBaseUrl}/agreement/rentee_years/${userName}/${startYear}/${endYear}`;
    console.log('url: ', url);
    return this.http.get(url);
  }
}
