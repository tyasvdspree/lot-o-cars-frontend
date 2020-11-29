import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocationSearchCriteria } from 'src/app/models/locationSearchCriteria.model';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { LocationService } from 'src/app/services/location.service';
import { Subscription } from 'rxjs';
import { Location } from 'src/app/models/location.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
  formControl = new FormControl();
  locations: Location[] ;
  filteredOptions: Observable<Location[]>;
  locationServiceSubscription: Subscription;

  constructor(
    private locationService: LocationService) { }

  ngOnInit() {
    this.filteredOptions = this.formControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    const locationSearchCriteria = new LocationSearchCriteria();
    locationSearchCriteria.city = 'Rotterdam';

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
    console.log(this.locations)
    return this.locations.filter(option => option.city.toLowerCase().includes(filterValue));
  }

}
