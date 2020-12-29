import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Car } from 'src/app/models/car.model';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-my-cars',
  templateUrl: './my-cars.component.html',
  styleUrls: ['./my-cars.component.scss']
})
export class MyCarsComponent implements OnInit, OnDestroy {

  carServiceSubscription: Subscription;
  displayedColumns = ['numberPlate', 'make', 'model'];
  ownCars: Car[];

  constructor(
    private carService: CarService
  ) { }

  ngOnInit(): void {
    this.carServiceSubscription = this.carService.getOwn().subscribe(
      response => {
        this.ownCars = response;
      },
      error => {
        console.log(error);
      }
    )
  }

  ngOnDestroy(): void {
    if (this.carServiceSubscription) {
      this.carServiceSubscription.unsubscribe();
    }
  }
}
