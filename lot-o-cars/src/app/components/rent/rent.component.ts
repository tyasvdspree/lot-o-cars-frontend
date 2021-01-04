import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Car } from 'src/app/models/car.model';
import { Make } from 'src/app/enums/make.enum';
import { Color } from 'src/app/enums/color.enum';
import { Transmission } from 'src/app/enums/transmission.enum';
import { Fuel } from 'src/app/enums/fuel.enum';
import { CarBody } from 'src/app/enums/carBody.enum';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.scss']
})
export class RentComponent implements OnInit {

  car: Car;
  imageFiles: FileList;

  SERVER_URL = "http://localhost:8080/car";

  makes: Object[] = [];
  colors: Object[] = [];
  transmissions: Object[] = [];
  fuelTypes: Object[] = [];
  carBodies: Object[] = [];

  subscriptions: Subscription[] = [];

  constructor(private httpClient: HttpClient, private carService: CarService) { }

  ngOnInit(): void {
    this.car = new Car();
    this.loadData();
    this.makes = this.makes.map(function (make) {
      return { key: Object.keys(Make).filter(x => Make[x] == make), value: make }
    });
    this.colors = this.colors.map(function (color) {
      return { key: Object.keys(Color).filter(x => Color[x] == color), value: color }
    });
    this.transmissions = this.transmissions.map(function (transmission) {
      return { key: Object.keys(Transmission).filter(x => Transmission[x] == transmission), value: transmission }
    });
    this.fuelTypes = this.fuelTypes.map(function (fuel) {
      return { key: Object.keys(Fuel).filter(x => Fuel[x] == fuel), value: fuel }
    });
    this.carBodies = this.carBodies.map(function (body) {
      return { key: Object.keys(CarBody).filter(x => CarBody[x] == body), value: body }
    });
  }

  private loadData(): void {
    this.loadSelectionList(this.carService.getMakes, this.carService, 'makes');
    this.loadSelectionList(this.carService.getColors, this.carService, 'colors');
    this.loadSelectionList(this.carService.getTransmissions, this.carService, 'transmissions');
    this.loadSelectionList(this.carService.getFuelTypes, this.carService, 'fuelTypes');
    this.loadSelectionList(this.carService.getCarBody, this.carService, 'carBodies');
  }

  private loadSelectionList(serviceMethod: any, service: any, localProp: any): void {
    this.subscriptions.push(
      serviceMethod.call(service).subscribe(
        values => {
          this[localProp] = values;
        }
      )
    );
  }

  receiveSelectedImageFiles(images: FileList) {
    this.imageFiles = images;
  }

  onSubmit() {
    console.log(this.car);

    // set defaults for non nullable values
    this.car.airco = false;
    this.car.color = 'blauw';
    this.car.isActive = true;
    this.car.navigation = false;
    this.car.rentPricePerHour = 5;
    this.car.smokingIsAllowed = false;
    this.car.userId = 3;
    this.car.locationId = 3;

    this.carService.createNewCar(this.car, this.imageFiles);
  }

}