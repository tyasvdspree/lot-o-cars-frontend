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
}
