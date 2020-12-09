import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  selectedDate: Date;
  blockedDates: Date[] = [new Date(2020, 11, 5), new Date(2020, 11, 10)];

  constructor() { }

  ngOnInit(): void {
  }

  dateChanged(date): void {
    alert(`Selected: ${date}`);
  }

  myDateFilter = (d: Date): boolean => {
    return this.blockedDates.map(Number).indexOf(+d) === -1;
  }

}
