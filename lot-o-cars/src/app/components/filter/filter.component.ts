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
  locations: Location[] =
    [
      {
        "locationId": 1,
        "addressLine1": "Blaak 12",
        "addressLine2": "",
        "city": "Rotterdam",
        "zipCode": "1234 AB",
        "countryCode": "NL",
        "municipality": "Rotterdam"
      },
      {
        "locationId": 2,
        "addressLine1": "Dam 34",
        "addressLine2": "Achter",
        "city": "Amsterdam",
        "zipCode": "2345 AB",
        "countryCode": "NL",
        "municipality": "Amsterdam"
      },
      {
        "locationId": 3,
        "addressLine1": "Grote Markt 45",
        "addressLine2": "(achter de kerk)",
        "city": "Groningen",
        "zipCode": "3456 AB",
        "countryCode": "NL",
        "municipality": "Groningen"
      }
    ];
  filteredOptions: Observable<Location[]>;
  locationServiceSubscription: Subscription;

  constructor(
    private locationService: LocationService) { }

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

}
