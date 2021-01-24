import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Location } from 'src/app/models/location.model';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  @Output() outputLocation = new EventEmitter();
  location: Location = new Location();

  constructor() { }

  ngOnInit(): void {
    this.location.countryCode = 528;
  }

  locationChanged(event: any): void {
    this.outputLocation.emit(this.location);
  }
}
