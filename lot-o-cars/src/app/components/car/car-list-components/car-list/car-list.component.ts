import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Car } from 'src/app/models/car.model';
import { CarSearchCriteria } from 'src/app/models/car-search-criteria.model';
import { CarService } from 'src/app/services/car-service/car.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Fuel } from 'src/app/enums/fuel.enum';
import { Transmission } from 'src/app/enums/transmission.enum';
import { CarBody } from 'src/app/enums/car-body.enum';
import { Make } from 'src/app/enums/make.enum';

@Component({
  selector: 'app-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit, OnDestroy {

  carServiceSubscription: Subscription;
  carSearchSubscription: Subscription;

  pageOfCars: Car[];

  @Input() cars: Car[];
  @Input() displayedColumns = [
    'image', 'numberPlate', 'make', 'model', 'modelYear', 'transmission', 'fuel',
    'body', 'navigation', 'airco', 'smokingIsAllowed'
  ];

  @Output() deactivateCarEvent = new EventEmitter<Car>();
  @Output() editCarEvent = new EventEmitter<Car>();
  isLoadingResults = false;

  // MatPaginator Inputs
  length = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  // MatPaginator Output
  pageEvent: PageEvent;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private carService: CarService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if (!this.cars) {
      this.carSearchSubscription = this.carService.SearchEvent.subscribe(
        criteria => {
          this.getCarsBySearchCriteria(criteria);
        },
        error => {
          this.toastr.error('Fout bij ophalen autogegevens.');
        }
      );

    } else {
      // Cars input from another component
      this.initPageItems();
    }

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
    this.isLoadingResults = true;
    this.carServiceSubscription = this.carService.find(searchCriteria).subscribe(
      response => {
        this.cars = response.map(x =>  ({ ...x, imageUrl: this.getImageUrl(x.numberPlate, x.mainCarImageId) }) );
        this.initPageItems();
      },
      error => {
        console.log(error);
        this.toastr.error('Er gaat iets fout met het ophalen van de autogegevens.')
      }
    ).add(() => {
      this.isLoadingResults = false;
    });
  }

  initPageItems() {
    this.length = this.cars.length;
    this.pageOfCars = this.cars.slice(0, this.pageSize);
  }

  MakeValue(value: string): string {
    return Make[value];
  }
  FuelValue(value: string): string {
    return Fuel[value];
  }
  TransmissionValue(value: string): string {
    return Transmission[value];
  }
  CarBodyValue(value: string): string {
    return CarBody[value];
  }

  loadPageItems(pageEvent) {
    this.pageSize = pageEvent.pageSize;
    const startIndex = (pageEvent.pageIndex) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.length);
    this.pageOfCars = this.cars.slice(startIndex, endIndex);
  }

  getImageUrl(numberPlate: string, carImageId: number): string {
    if (carImageId > 0)
      return this.carService.getCarImageUrl(numberPlate, carImageId);
    else
      return "assets/img/app/maincar.jpg"; // get standard lot-o-cars car image
  }

  onRowClicked(car: Car): void {
    console.log('Row clicked: ', car);
    this.router.navigateByUrl(`/cardetails/${car.numberPlate}`);
  }

  deactivateCar(car: Car): void {
    this.deactivateCarEvent.emit(car);
  }

  editCar(car: Car): void {
    this.editCarEvent.emit(car);
  }
}
