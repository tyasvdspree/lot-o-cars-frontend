import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Car } from 'src/app/models/car.model';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-cardetails',
  templateUrl: './cardetails.component.html',
  styleUrls: ['./cardetails.component.scss']
})
export class CardetailsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  licensePlate: string;
  carId: number;
  car: Car;
  blockedDates: Date[];

  constructor(
    private route: ActivatedRoute,
    private carService: CarService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.params.subscribe(parameters => {
        this.licensePlate = parameters.id;
        this.getRentedDatesOfCar();
        this.getCarDetails();
      })
    );
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.forEach(x => x.unsubscribe());
    }
  }

  getRentedDatesOfCar(): void {
    this.subscriptions.push(
      this.carService.getBlockedDates(this.licensePlate).subscribe(
        response => {
          console.log(response);
          this.blockedDates = response;
        },
        error => {
          console.log(error);
        }
      )
    );
  }

  getCarDetails(): void {
    this.subscriptions.push(
      this.carService.findByNumberPlate(this.licensePlate).subscribe(
        response => {
          console.log(response);
          this.car = response;
        },
        error => {
          console.log(error);
        }
      )
    );
  }
}
