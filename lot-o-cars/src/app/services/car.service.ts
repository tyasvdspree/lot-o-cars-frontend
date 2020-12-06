import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car } from '../models/car.model';
import { CarSearchCriteria } from '../models/carSearchCriteria.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  cars: Car[];

  public SearchEvent: EventEmitter<CarSearchCriteria> = new EventEmitter<CarSearchCriteria>();

  constructor(private http: HttpClient) { }

  getMakes(): Observable<string[]> {
    return of(['Audi', 'BMW', 'Ford', 'Kia', 'Opel', 'Volkswagen', 'rood', 'zwart']);
  }

  getColors(): Observable<string[]> {
    return of(['blauw', 'geel', 'grijs', 'groen', 'oranje', 'rood', 'zwart']);
  }

  getTransmissions(): Observable<string[]> {
    return of(['automaat', 'handgeschakeld', 'semi-automaat']);
  }

  getFuelTypes(): Observable<string[]> {
    return of(['benzine', 'diesel', 'elektrisch']);
  }


  getAll(): Observable<any> {
    return this.http.get(environment.apiBaseUrl + '/renting');
  }

  find(searchCriteria: CarSearchCriteria): Observable<any> {
    let url = environment.apiBaseUrl + '/renting/search' +
      '?city=' + searchCriteria.pickUpLocation +
      '&make=' + searchCriteria.make +
      '&color=' + searchCriteria.color;
    url = url.split('undefined').join('');
    console.log(url);
    return this.http.get(url);
  }

  findByNumberPlate(plate: string): Observable<any> {
    return this.http.get(environment.apiBaseUrl + '/renting/' + plate);
  }

}
