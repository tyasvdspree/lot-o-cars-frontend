import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from 'src/app/models/car.model';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.scss']
})
export class RentComponent implements OnInit {

    SERVER_URL = "http://localhost:8080/car";
    car:Car;

    constructor(private httpClient: HttpClient) {

    }

  ngOnInit(): void {
      this.car = new Car();
  }

  onSubmit() {
    console.log(this.car);

    this.httpClient.put<Car>(this.SERVER_URL, this.car).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

}