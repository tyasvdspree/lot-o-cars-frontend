import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car } from '../../models/car.model';
import { CarSearchCriteria } from '../../models/car-search-criteria.model';
import { Transmission} from 'src/app/enums/transmission.enum';
import { Fuel} from 'src/app/enums/fuel.enum';
import { Make } from 'src/app/enums/make.enum';
import { Color } from 'src/app/enums/color.enum';
import { CarBody } from 'src/app/enums/car-body.enum';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  cars: Car[];
  searchCriteria: CarSearchCriteria = new CarSearchCriteria();
  simpleSearchMode = true;
  carController = '/car';
  carImageController = '/carimage';

  transmission:Transmission[] = [];
  fuel:Fuel[] = [];
  make:Make[] = [];
  color:Color[] = [];
  carBody:CarBody[] = [];

  public SearchEvent: EventEmitter<CarSearchCriteria> = new EventEmitter<CarSearchCriteria>();

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private datePipe: DatePipe
  ) {
    this.transmission = Object.values(Transmission);
    this.fuel = Object.values(Fuel);
    this.make = Object.values(Make);
    this.color = Object.values(Color);
    this.carBody = Object.values(CarBody);
  }


  getMakes(): Observable<Make[]> {
    return of(this.make);
  }

  getColors(): Observable<Color[]> {
    return of(this.color);
  }

  getTransmissions(): Observable<Transmission[]> {
    return of(this.transmission);
  }

  getFuelTypes(): Observable<Fuel[]> {
    return of(this.fuel);
  }

  getCarBody(): Observable<CarBody[]>{
    return of(this.carBody);
  }

  // get all cars stored in the database
  getAll(): Observable<any> {
    return this.http.get(environment.apiBaseUrl + '/renting');
  }

  // get a list of cars based on the provided search criteria
  find(searchCriteria: CarSearchCriteria): Observable<any> {
    let httpParams = new HttpParams()
        .set('city', this.getParamString(searchCriteria.pickUpLocation))
        .set('pickupdate', this.datePipe.transform(searchCriteria.pickUpDate, 'yyyy-MM-dd'))
        .set('dropoffdate', this.datePipe.transform(searchCriteria.dropOffDate, 'yyyy-MM-dd'))
        .set('make', this.getParamString(searchCriteria.make))
        .set('model', this.getParamString(searchCriteria.model))
        .set('color', this.getParamString(searchCriteria.color))
        .set('transmission', this.getParamString(searchCriteria.transmission))
        .set('fuel', this.getParamString(searchCriteria.fuel))
        .set('modelyear', this.getParamString(searchCriteria.modelYear))
        .set('doors', this.getParamString(searchCriteria.doors))
        .set('seats', this.getParamString(searchCriteria.seats))
        .set('bootspace', this.getParamString(searchCriteria.bootspaceInLiters))
        .set('nonsmoking', this.getParamString(searchCriteria.nonSmoking));
    return this.http.get(environment.apiBaseUrl + '/renting/search', { params: httpParams });
  }

  getParamString(paramValue: any): string {
    if (paramValue) {
      return paramValue.toString();
    } else {
      return '';
    }
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

  deleteCarImage(imageId: string): Observable<any>  {
    return this.http.delete(environment.apiBaseUrl + '/carimage/deleteImage?imageId=' + imageId);
  }

  createNewCar(newCar: Car, newCarImages: FileList): void {
    const url = environment.apiBaseUrl + this.carController;

    this.http.post<any>(url, newCar).subscribe(
        (res) => {
          console.log(res);
          // add selected images to the just registered car
          if (newCarImages) {
            Array.from(newCarImages).forEach(carImageFile => {
              this.addImageFileToCar(res.numberPlate, carImageFile);
            });
          }
          this.toastr.success('Auto succesvol toegevoegd', 'Success');
        },
        (err) => console.log(err)
    )
  }

  addImageFileToCar(entityId: string, imageFile: File): void
  {
    const formData: FormData = new FormData();
    formData.append('imagefile', imageFile);
    const url = environment.apiBaseUrl + this.carImageController + '/' + entityId;

    this.http.post<any>(url, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );

  }

  // get own cars stored in the database
  getOwn(): Observable<any> {
    return this.http.get(environment.apiBaseUrl + '/car');
  }

  editCar(car){
    return this.http.put(environment.apiBaseUrl + "/car/editmycar", car);
  }

  addImagesToCar(car: Car, newCarImages: FileList){
    if (newCarImages) {
      Array.from(newCarImages).forEach(image => {
        this.addImageFileToCar(car.numberPlate, image);
      });
    }
  }
}
