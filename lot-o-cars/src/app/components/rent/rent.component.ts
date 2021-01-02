import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car.model';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.scss']
})
export class RentComponent implements OnInit {

  car: Car;
  imageFiles: FileList;

  constructor(private carService: CarService) { }

  ngOnInit(): void {
      this.car = new Car();
  }

  receiveSelectedImageFiles(images: FileList) {
    this.imageFiles = images;
  }

  onSubmit() {
    console.log(this.car);
    console.log('num of images: ' + this.imageFiles.length);

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