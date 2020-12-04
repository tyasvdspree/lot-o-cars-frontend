import { Component, OnDestroy, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { CarSearchCriteria } from 'src/app/models/carSearchCriteria.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
  panelOpenState = false;
  simpleSearchMode = true;

  makes: string[] = [];
  colors: string[] = [];
  transmissions: string[] = [];
  fuelTypes: string[] = [];

  subscriptions: Subscription[] = [];
  searchCriteria: CarSearchCriteria;

  constructor(
    private carService: CarService
  ) { }

  ngOnInit(): void {
    this.searchCriteria = new CarSearchCriteria();
    this.loadData();
    this.setDefaultData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      subscription => {
        if (subscription) {
          subscription.unsubscribe();
        }
      }
    );
  }

  toggleMoreSearchFields(): void {
    this.simpleSearchMode = !this.simpleSearchMode;
  }

  private loadData(): void {
    this.loadSelectionData(this.carService.getMakes, this.carService, 'makes');
    this.loadSelectionData(this.carService.getColors, this.carService, 'colors');
    this.loadSelectionData(this.carService.getTransmissions, this.carService, 'transmissions');
    this.loadSelectionData(this.carService.getFuelTypes, this.carService, 'fuelTypes');
  }

  private loadSelectionData(serviceMethod: any, service: any, localProp: any): void {
    this.subscriptions.push(
      serviceMethod.call(service).subscribe(
        values => {
          this[localProp] = values;
        }
      )
    );
  }

  private setDefaultData(): void {
    // set pickup date to noon tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(13, 0, 0, 0);
    this.searchCriteria.pickUpDate = tomorrow.toISOString().slice(0, 16);
    // set drop off date to noon a day after tomorrow
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.searchCriteria.dropOffDate = tomorrow.toISOString().slice(0, 16);
  }

  searchClick(): void {
    console.log('search with the following criteria: ' + JSON.stringify(this.searchCriteria));
    this.carService.SearchEvent.emit(this.searchCriteria);
  }

}
