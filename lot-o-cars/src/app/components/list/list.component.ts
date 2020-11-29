import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Car } from 'src/app/models/car.model';
import { CarSearchCriteria } from 'src/app/models/carSearchCriteria.model';
import { CarService } from 'src/app/services/car.service';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  carServiceSubscription: Subscription;
  cars: Car[];
  displayedColumns = ['make', 'model', 'modelYear', 'transmission', 'fuel', 'body', 'navigation', 'airco'];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private carService: CarService,
    private router: Router) { }

  ngOnInit(): void {
    const searchCriteria = new CarSearchCriteria();
    searchCriteria.make = 'BMW';

    this.carServiceSubscription = this.carService.find(searchCriteria).subscribe(
      response => {
        this.cars = response;
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
        this.resultsLength = this.cars.length;
        console.log(this.cars);
      },
      error => {
        console.log(error);
      }
    );    
  }

  ngOnDestroy(): void {
    this.carServiceSubscription.unsubscribe();
  }

  onRowClicked(car: Car): void {
    console.log('Row clicked: ', car);
    this.router.navigateByUrl(`/cardetails/${car.carId}`);
  }

}
