import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car.model';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-cardetails',
  templateUrl: './cardetails.component.html',
  styleUrls: ['./cardetails.component.scss']
})
export class CardetailsComponent implements OnInit {
  carId: number;
  car: Car;

  constructor(
    private route: ActivatedRoute, 
    private carService: CarService) { }

  ngOnInit(): void {
    this.route.params.subscribe(parameters => {
      this.carId = parameters.id;
      console.log('Details carId: ' + this.carId);
      this.car = this.carService.findById(this.carId);
      console.log('Details car: ' + JSON.stringify(this.car));
    })
  }

}
