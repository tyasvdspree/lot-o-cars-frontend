import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarSearchCriteria } from '../models/carSearchCriteria.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  // TODO: implement backend api
  find(searchCriteria: CarSearchCriteria): Observable<any> {
    return this.http.get("./assets/data/cars.json");
  }

  // TODO: implement backend api
  findById(carId: number): Observable<any> {
    return this.http.get("./assets/data/cars.json");
  }

}
