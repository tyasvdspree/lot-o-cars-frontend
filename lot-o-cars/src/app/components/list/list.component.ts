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
  carSearchSubscription: Subscription;
  cars: Car[];
  displayedColumns = ['image',
    'numberPlate', 'make', 'model', 'modelYear', 'transmission', 'fuel',
    'body', 'navigation', 'airco', 'smokingIsAllowed'
  ];

  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private carService: CarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cars = this.carService.cars;

    this.carSearchSubscription = this.carService.SearchEvent.subscribe(
      criteria => {
        this.isLoadingResults = true;
        this.getCarsBySearchCriteria(criteria);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.carSearchSubscription) {
      this.carSearchSubscription.unsubscribe();
    }
    if (this.carServiceSubscription) {
      this.carServiceSubscription.unsubscribe();
    }
  }

  getCarsBySearchCriteria(searchCriteria: CarSearchCriteria): void {
    console.log('getCarsBySearchCriteria: ' + JSON.stringify(searchCriteria));
    this.carServiceSubscription = this.carService.find(searchCriteria).subscribe(
      response => {
        // this.cars = response;
        this.cars = response.map(x =>  ({ ...x, imageUrl: this.getImageUrl(x.numberPlate, x.mainCarImageId) }) );
        this.carService.cars = this.cars;
        this.isRateLimitReached = false;
        this.resultsLength = this.cars.length;
        console.log(this.cars);
      },
      error => {
        console.log(error);
      }
    ).add(() => {
      this.isLoadingResults = false;
    });
  }

  getImageUrl(numberPlate: string, carImageId: number): string {
    if (carImageId > 0)
      return this.carService.getCarImageUrl(numberPlate, carImageId)
    else
      return "assets/img/app/maincar.jpg"
  }

  onRowClicked(car: Car): void {
    console.log('Row clicked: ', car);
    this.router.navigateByUrl(`/cardetails/${car.numberPlate}`);
  }

}
