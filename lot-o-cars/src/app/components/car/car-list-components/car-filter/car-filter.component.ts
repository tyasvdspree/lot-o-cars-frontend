import { Component, OnDestroy, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car-service/car.service';
import { CarSearchCriteria } from 'src/app/models/car-search-criteria.model';
import { Make } from 'src/app/enums/make.enum';
import { Color } from 'src/app/enums/color.enum';
import { Transmission } from 'src/app/enums/transmission.enum';
import { Fuel } from 'src/app/enums/fuel.enum';
import { CarBody } from 'src/app/enums/car-body.enum';
import { Subscription } from 'rxjs';
import { DateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.scss']
})
export class CarFilterComponent implements OnInit, OnDestroy {
  panelOpenState = false;
  simpleSearchMode = true;

  makes: any[] = [];
  colors: any[] = [];
  transmissions: any[] = [];
  fuelTypes: any[] = [];
  carBodies: any[]= [];

  subscriptions: Subscription[] = [];
  searchCriteria: CarSearchCriteria = new CarSearchCriteria();

  constructor(
    private carService: CarService,
    private readonly adapter: DateAdapter<Date>
  ) { }


  ngOnInit(): void {
    this.adapter.setLocale('nl-NL');
    this.loadSelectionLists();

    this.makes = this.makes.map(function(make) {
      return {key:Object.keys(Make).filter(x => Make[x] == make), value:make}
    });
    this.colors = this.colors.map(function(color) {
      return {key:Object.keys(Color).filter(x => Color[x] == color), value:color}
    });
    this.transmissions = this.transmissions.map(function(transmission) {
      return {key:Object.keys(Transmission).filter(x => Transmission[x] == transmission), value:transmission}
    });
    this.fuelTypes = this.fuelTypes.map(function(fuel) {
      return {key:Object.keys(Fuel).filter(x => Fuel[x] == fuel), value:fuel}
    });
    this.carBodies = this.carBodies.map(function(body) {
      return {key:Object.keys(CarBody).filter(x => CarBody[x] == body), value:body}
    });

    this.simpleSearchMode = this.carService.simpleSearchMode;

    if (this.carService.searchCriteria.pickUpDate) {
      this.searchCriteria = this.carService.searchCriteria;
    } else {
      this.setDefaultSearchData();
    }
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

  private loadSelectionLists(): void {
    this.loadSelectionList(this.carService.getMakes, this.carService, 'makes');
    this.loadSelectionList(this.carService.getColors, this.carService, 'colors');
    this.loadSelectionList(this.carService.getTransmissions, this.carService, 'transmissions');
    this.loadSelectionList(this.carService.getFuelTypes, this.carService, 'fuelTypes');
    this.loadSelectionList(this.carService.getCarBody, this.carService, 'carBodies');
  }

  private loadSelectionList(serviceMethod: any, service: any, localProp: any): void {
    this.subscriptions.push(
      serviceMethod.call(service).subscribe(
        values => {
          this[localProp] = values;
        }
      )
    );
  }

  public setDefaultSearchData(): void {
    this.searchCriteria = new CarSearchCriteria();
    // set pickup date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.searchCriteria.pickUpDate = tomorrow;
    // set drop off date to day after tomorrow
    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(tomorrow.getDate() + 2);
    this.searchCriteria.dropOffDate = dayAfterTomorrow;
  }

  searchClick(): void {
    // remember settings for returning from car details to the list
    this.carService.simpleSearchMode = this.simpleSearchMode;
    this.carService.searchCriteria = this.searchCriteria;
    console.log(this.searchCriteria);
    this.carService.SearchEvent.emit(this.searchCriteria);
  }

}
