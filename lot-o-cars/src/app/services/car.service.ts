import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car.model';
import { CarSearchCriteria } from '../models/carSearchCriteria.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  cars: Car[];

  public SearchEvent: EventEmitter<CarSearchCriteria> = new EventEmitter<CarSearchCriteria>();

  constructor(private http: HttpClient) { }

  // TODO: implement backend api
  find(searchCriteria: CarSearchCriteria): Observable<any> {
    return this.http.get('./assets/data/cars.json');
  }

  // TODO: implement backend api
  findById(carId: number): Observable<any> {
    return this.http.get('./assets/data/cars.json');
  }

  // TODO: implement backend api
  findByLicensePlate(lp: string): Observable<any> {
    return this.http.get('./assets/data/cars.json');
  }

}
