import { Component, OnInit, ViewChild } from '@angular/core';
import { Car } from 'src/app/models/car.model';
import { CarSearchCriteria } from 'src/app/models/carSearchCriteria.model';
import { CarService } from 'src/app/services/car.service';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  cars: Car[];
  displayedColumns = ['make', 'model', 'buildDate', 'transmission', 'fuel', 'body', 'navigation', 'airco'];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private carSearch: CarService,
    private router: Router) { }

  ngOnInit(): void {
    const searchCriteria = new CarSearchCriteria();
    searchCriteria.make = 'BMW';
    this.cars = this.carSearch.find(searchCriteria);

    this.isLoadingResults = false;
    this.isRateLimitReached = false;
    this.resultsLength = this.cars.length;
    console.log(this.cars);
  }

  onRowClicked(car: Car): void {
    console.log('Row clicked: ', car);
    this.router.navigateByUrl(`/cardetails/${car.id}`);
  }

}
