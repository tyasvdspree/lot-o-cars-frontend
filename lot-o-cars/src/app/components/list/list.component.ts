import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car.model';
import { CarSearchCriteria } from 'src/app/models/carSearchCriteria.model';
import { CarsearchService } from 'src/app/services/carsearch.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  cars: Car[];
  displayedColumns = ['make', 'model'];

  constructor(private carSearch: CarsearchService) { }

  ngOnInit(): void {
    const searchCriteria = new CarSearchCriteria();
    searchCriteria.make = 'BMW';
    this.cars = this.carSearch.find(searchCriteria);
    console.log(this.cars);
  }

}
