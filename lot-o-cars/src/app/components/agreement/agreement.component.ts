import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Agreement} from '../../models/agreement.model';
import {CarService} from '../../services/car.service';

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.scss']
})
export class AgreementComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()  });

  agreement: Agreement = new Agreement();

  numberOfDays = null;


  constructor(private carService: CarService) { }

  ngOnInit(): void {
  }


  get daysBetween(): number {
    const StartDate = this.range.value.start;
    const EndDate = this.range.value.end;
    if (StartDate === null || EndDate === null) {
      return null;
    }
    // The number of milliseconds in all UTC days (no DST)
    const oneDay = 1000 * 60 * 60 * 24;

    // A day in UTC always lasts 24 hours (unlike in other time formats)
    const start = Date.UTC(EndDate.getFullYear(), EndDate.getMonth(), EndDate.getDate());
    const end = Date.UTC(StartDate.getFullYear(), StartDate.getMonth(), StartDate.getDate());


    // so it's safe to divide by 24 hours
    const numberOfDays = ((start - end) / oneDay) + 1;
    this.numberOfDays = numberOfDays;
    return numberOfDays;
  }


}
