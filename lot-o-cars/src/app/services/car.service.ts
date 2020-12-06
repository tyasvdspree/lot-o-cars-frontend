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
    return of(['Alfa Romeo', 'Aston Martin', 'Audi', 'Bentley', 'BMW', 'Buick', 'Cadillac', 'Chevrolet',
      'Chrysler', 'Citroën', 'Ferrari', 'Fiat', 'Ford', 'Honda', 'Hyundai', 'Jaguar', 'Kia', 'Land Rover',
      'Lexus', 'Mazda', 'Mercedes-Benz', 'Mitsubishi', 'Nissan', 'Opel', 'Peugeot', 'Porsche', 'Renault', 
      'Saab', 'Seat', 'Subaru', 'Suzuki', 'Toyota', 'Volkswagen', 'Volvo']);
  }

  getColors(): Observable<string[]> {
    return of(['blauw', 'bruin', 'geel', 'grijs', 'groen', 'oranje', 'paars', 'rood', 'roze', 'wit', 'zwart']);
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
      '&model=' + searchCriteria.model +
      '&color=' + searchCriteria.color +
      '&fuel=' + searchCriteria.fuel +
      '&modelyear=' + searchCriteria.modelYear +
      '&doors=' + searchCriteria.doors +
      '&seats=' + searchCriteria.seats +
      '&bootspace=' + searchCriteria.bootspaceInLiters +
      '&nonsmoking=' + searchCriteria.nonSmoking;
    url = url.split('undefined').join('');
    console.log(url);
    return this.http.get(url);
  }

  findByNumberPlate(plate: string): Observable<any> {
    return this.http.get(environment.apiBaseUrl + '/renting/' + plate);
  }

}
