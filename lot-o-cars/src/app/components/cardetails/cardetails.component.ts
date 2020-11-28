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
  carId: number;
  car: Car;

  constructor(
    private route: ActivatedRoute, 
    private carService: CarService) { }

  ngOnInit(): void {
    this.route.params.subscribe(parameters => {
      this.carId = parameters.id;
      console.log('Details carId: ' + this.carId);

      this.carServiceSubscription = this.carService.findById(this.carId).subscribe(
        response => {
          console.log(response);
          response.forEach(c => {
            if (c.carId == this.carId) {
              this.car = c;
            }
          });
        },
        error => {
          console.log(error);
        }
      );    
    })
  }

}
