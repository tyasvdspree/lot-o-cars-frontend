import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
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
  searchCriteria: CarSearchCriteria = new CarSearchCriteria();
  simpleSearchMode = true;
  carController = '/car';
  carImageController = '/carimage';


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


  // get all cars stored in the database
  getAll(): Observable<any> {
    return this.http.get(environment.apiBaseUrl + '/renting');
  }

  // get a list of cars based on the provided search criteria
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

  // get car details by number plate
  findByNumberPlate(plate: string): Observable<any> {
    return this.http.get(environment.apiBaseUrl + '/renting/' + plate);
  }

  // get the dates the specified car is not available
  getBlockedDates(plate: string): Observable<any> {
    return this.http.get(environment.apiBaseUrl + '/agreement/' + plate);
  }

  getCarImageIds(plate: string): Observable<any> {
    return this.http.get(environment.apiBaseUrl + '/carimage/' + plate);
  }

  getCarImageUrl(plate: string, imageid: number): string {
    return environment.apiBaseUrl + '/carimage/' + plate + '/' + imageid;
  }


  createNewCar(newCar: Car, newCarImages: FileList): void {
    const url = environment.apiBaseUrl + this.carController;

    this.http.post<any>(url, newCar).subscribe(
        (res) => {
          console.log(res);
          // add selected images to the just registered car
          Array.from(newCarImages).forEach(carImageFile => {
            this.addImageFileToCar(res.numberPlate, carImageFile);
          });
        },
        (err) => console.log(err)
    )
  }

  addImageFileToCar(entityId: string, imageFile: File): void 
  {
    const formData: FormData = new FormData();
    formData.append('imagefile', imageFile);
    const url = environment.apiBaseUrl + this.carImageController + '/' + entityId;
    // console.log(url);

    this.http.post<any>(url, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    
  }

  // get own cars stored in the database
  getOwn(): Observable<any> {
    return this.http.get(environment.apiBaseUrl + '/car');
  }

}
