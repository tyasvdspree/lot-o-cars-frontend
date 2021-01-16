import {Component, Inject, Input, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarService } from 'src/app/services/car.service';
import { Subscription } from 'rxjs';
import { Car } from 'src/app/models/car.model';
import { Make } from 'src/app/enums/make.enum';
import { Color } from 'src/app/enums/color.enum';
import { Transmission } from 'src/app/enums/transmission.enum';
import { Fuel } from 'src/app/enums/fuel.enum';
import { CarBody } from 'src/app/enums/carBody.enum';

@Component({
  selector: 'app-edit-car-buton',
  templateUrl: './edit-car-buton.component.html',
  styleUrls: ['./edit-car-buton.component.scss']
})
export class EditCarButonComponent implements OnInit {

  car: Car;
  imageFiles: FileList;

  SERVER_URL = "http://localhost:8080/car";


  makes: any[] = [];
  colors: any[] = [];
  transmissions: any[] = [];
  fuelTypes: any[] = [];
  carBodies: any[] = [];

  subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditCarButonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {car: Car},
    private carService: CarService
  ) { }

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

  editCar(): void  {
    console.log(this.car)
  }
}
