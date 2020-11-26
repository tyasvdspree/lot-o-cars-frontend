import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../models/car.model';
import { CarSearchCriteria } from '../models/carSearchCriteria.model';

@Injectable({
  providedIn: 'root'
})
export class CarsearchService {

  private cars: Car[] = [
    { id: 1, licensePlate: '51-RS-00', make: 'BMW',  model: '528',    body: 'sedan',     transmission: 'automaat',       color: 'bruin',  fuel: 'benzine', passengers: 4, bootSpaceInLiters: 380, navigation: false, airco: false },
    { id: 2, licensePlate: '10-NR-RS', make: 'Opel', model: 'Kadett', body: 'coupe',     transmission: 'handgeschakeld', color: 'oranje', fuel: 'benzine', passengers: 4, bootSpaceInLiters: 250, navigation: false, airco: false },
    { id: 3, licensePlate: '3-ZNL-32', make: 'Audi', model: 'A3 1.4', body: 'sedan',     transmission: 'handgeschakeld', color: 'wit',    fuel: 'benzine', passengers: 4, bootSpaceInLiters: 360, navigation: true, airco: true },
    { id: 4, licensePlate: '4-TTH-43', make: 'BMW',  model: '116i',   body: 'hatchback', transmission: 'handgeschakeld', color: 'blauw',  fuel: 'benzine', passengers: 4, bootSpaceInLiters: 380, navigation: false, airco: true },
    { id: 5, licensePlate: 'H-735-GT', make: 'Ford', model: 'Focus',  body: 'hatchback', transmission: 'automaat',       color: 'blauw',  fuel: 'benzine', passengers: 4, bootSpaceInLiters: 280, navigation: true, airco: true }
  ];

  constructor() { }

  find(searchCriteria: CarSearchCriteria): Car[] {
    return this.cars;
  }

}
