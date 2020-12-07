import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Car } from 'src/app/models/car.model';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-cardetails',
  templateUrl: './cardetails.component.html',
  styleUrls: ['./cardetails.component.scss']
})
export class CardetailsComponent implements OnInit {
  carServiceSubscription: Subscription;
  licensePlate: string;
  carId: number;
  car: Car;

  constructor(
    private route: ActivatedRoute,
    private carService: CarService) { }

  ngOnInit(): void {
    this.route.params.subscribe(parameters => {
      this.licensePlate = parameters.id;
      console.log('Details license plate: ' + this.licensePlate);

      this.carServiceSubscription = this.carService.findByNumberPlate(this.licensePlate).subscribe(
        response => {
          console.log(response);
          this.car = response;
        },
        error => {
          console.log(error);
        }
      );
    });
  }
}
