import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { Subscription } from 'rxjs';
import { Car } from 'src/app/models/car.model';
import { CarService } from 'src/app/services/car.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-daterangepicker',
  templateUrl: './daterangepicker.component.html',
  styleUrls: ['./daterangepicker.component.scss']
})
export class DaterangepickerComponent implements OnInit, OnDestroy {
  form: FormGroup;
  subscriptions: Subscription[] = [];
  @Input() car: Car;
  blockedDates: Date[];
  @Output() startDate = new EventEmitter();
  @Output() endDate = new EventEmitter();
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(
    private carService: CarService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      daterange: new FormGroup({
        start: new FormControl(),
        end: new FormControl(),
      }),
    });
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

  startDateChanged(): void {
    this.startDate.emit(this.form.value.daterange.start);
  }

  endDateChanged(): void {
    this.endDate.emit(this.form.value.daterange.end);
  }

  myDateFilter = (d: Date): boolean => {
    return this.blockedDates.map(Number).indexOf(+d) === -1;
  }
}
