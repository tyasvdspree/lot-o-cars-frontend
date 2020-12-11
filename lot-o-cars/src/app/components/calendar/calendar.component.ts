import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  minDate: Date;
  selectedDate: Date;
  @Input() blockedDates: Date[];

  constructor() { }

  ngOnInit(): void {
    this.setMinCalendarDate();
  }

  dateChanged(date): void {
    console.log(`Selected: ${date}`);
  }

  // this function returns false if a date param d must be blocked on the calendar.
  // date d is checked for the array of blocked dates and if it is found
  // (indexOf != -1) it wil return false;
  myDateFilter = (d: Date): boolean => {
    return this.blockedDates.map(Number).indexOf(+d) === -1;
  }

  setMinCalendarDate(): void {
    const today = new Date();
    this.minDate = new Date(today.getFullYear(), today.getMonth(), 1);
  }

}
