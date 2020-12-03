import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocationSearchCriteria } from 'src/app/models/locationSearchCriteria.model';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LocationService } from 'src/app/services/location.service';
import { Subscription } from 'rxjs';
import { Location } from 'src/app/models/location.model';
import { CarService } from 'src/app/services/car.service';
import { CarSearchCriteria } from 'src/app/models/carSearchCriteria.model';

export interface Color {
  name: string;
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
  panelOpenState = false;
  options: Color[] = [
    {name: 'Zwart'},
    {name: 'Wit'},
    {name: 'Rood'}
  ];
  formControl = new FormControl();
  startDate = new FormControl(new Date());
  endDate = new FormControl(new Date());
  locations: Location[];
  filteredOptions: Observable<Location[]>;
  locationServiceSubscription: Subscription;

  constructor(
    private locationService: LocationService,
    private carService: CarService
  ) { }

  ngOnInit(): void {
    this.filteredOptions = this.formControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    const locationSearchCriteria = new LocationSearchCriteria();
    this.locationServiceSubscription = this.locationService.find(locationSearchCriteria).subscribe(
      response => {
        this.locations = response;
        console.log(this.locations);
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnDestroy(): void {
    this.locationServiceSubscription.unsubscribe();
  }

  private _filter(value: string): Location[] {
    const filterValue = value.toLowerCase();
    return this.locations.filter(option => option.city.toLowerCase().includes(filterValue));
  }

  searchClick(): void {
    console.log('search clicked!');
    const criteria = new CarSearchCriteria();
    criteria.pickUpLocation = 'Rotterdam';
    this.carService.SearchEvent.emit(criteria);
  }

}
