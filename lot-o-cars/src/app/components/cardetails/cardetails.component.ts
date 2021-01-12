import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Car } from 'src/app/models/car.model';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-cardetails',
  templateUrl: './cardetails.component.html',
  styleUrls: ['./cardetails.component.scss']
})
export class CardetailsComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean;
  subscriptions: Subscription[] = [];
  licensePlate: string;
  carId: number;
  car: Car;
  blockedDates: Date[];
  carImageIds = [];
  carImages = [];

  constructor(
    private authenticationService: AuthService,
    private route: ActivatedRoute,
    private carService: CarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoggedIn =  this.authenticationService.isLoggedIn();
    this.subscriptions.push(
      this.route.params.subscribe(parameters => {
        this.licensePlate = parameters.id;
        this.getRentedDatesOfCar();
        this.getCarDetails();
        this.getCarImages();
      })
    );
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.forEach(x => x.unsubscribe());
    }
  }

  getRentedDatesOfCar(): void {
    this.subscriptions.push(
      this.carService.getBlockedDates(this.licensePlate).subscribe(
        response => {
          // console.log('rented dates: ' + response);

          if (response) {
            this.blockedDates = response.map(x => new Date(x).setHours(0));
            // console.log('[blocked dates]: ', this.blockedDates);
          }
        },
        error => {
          console.log(error);
        }
      )
    );
  }

  getCarDetails(): void {
    this.subscriptions.push(
      this.carService.findByNumberPlate(this.licensePlate).subscribe(
        response => {
          this.car = response;
        },
        error => {
          console.log(error);
        }
      )
    );
  }

  getCarImages(): void {
    this.subscriptions.push(
      this.carService.getCarImageIds(this.licensePlate).subscribe(
        response => {
          this.carImageIds = response;

          this.carImageIds.forEach(imageId => 
            this.carImages.push({path: this.carService.getCarImageUrl(this.licensePlate, imageId)})
          );
        },
        error => {
          console.log(error);
        }
      )
    );
  }

  onDateSelected(selectedDate: Date): void {
    console.log('selected date by child component: ' + selectedDate.toString());
  }

  onButtonClicked(): void {
    this.router.navigateByUrl(`/agreement/${this.car.numberPlate}`);
  }
}
