import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { Subscription } from 'rxjs';
import { Car } from 'src/app/models/car.model';
import { CarService } from 'src/app/services/car.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-daterangepicker',
  templateUrl: './daterangepicker.component.html',
  styleUrls: ['./daterangepicker.component.scss']
})
export class DaterangepickerComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  @Input() car: Car;
  minDate: Date = new Date();
  blockedDates: Date[];
  @Output() startDate = new EventEmitter<Date>();
  @Output() endDate = new EventEmitter<Date>();
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(
    private carService: CarService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.carService.getBlockedDates(this.car.numberPlate).subscribe(
        response => {
          if (response) {
            this.blockedDates = response.map(x => new Date(x + ' 00:00:00'));
          }
        },
        error => {
          console.log(error);
        }
      ));
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.forEach(x => x.unsubscribe());
    }
  }

  dateRangeChanged(dateRangeStart, dateRangeEnd): void {
    this.startDate.emit(dateRangeStart);
    this.endDate.emit(dateRangeEnd);
  }

  myDateFilter = (d: Date): boolean => {
    return this.blockedDates.map(Number).indexOf(+d) === -1;
  }
}
