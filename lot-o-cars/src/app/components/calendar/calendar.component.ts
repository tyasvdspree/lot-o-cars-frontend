import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  selectedDate: Date;
  @Input() blockedDates: Date[];

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
