import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationSearchCriteria } from '../models/locationSearchCriteria.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  // TODO: implement backend api
  find(searchCriteria: LocationSearchCriteria): Observable<any> {
    return this.http.get('./assets/data/locations.json');
  }

  // TODO: implement backend api
  findById(locationId: number): Observable<any> {
    return this.http.get('./assets/data/locations.json');
  }

}
