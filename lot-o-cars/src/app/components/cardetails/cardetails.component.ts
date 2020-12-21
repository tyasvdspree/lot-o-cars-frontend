import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
    private router: Router,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.isLoggedIn =  this.authenticationService.isLoggedIn();
    this.subscriptions.push(
      this.route.params.subscribe(parameters => {
        this.licensePlate = parameters.id;
        this.getRentedDatesOfCar();
        this.getCarDetails();
        this.getCarImageIds();
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
          console.log('rented dates: ' + response);

          if (response) {
            this.blockedDates = response.map(x => new Date(x + ' 00:00:00'));
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
          console.log(response);
          this.car = response;
        },
        error => {
          console.log(error);
        }
      )
    );
  }

  getCarImageIds(): void {
    this.subscriptions.push(
      this.carService.getCarImageIds(this.licensePlate).subscribe(
        response => {
          console.log('image ids: ' + response);
          this.carImageIds = response;
          if (this.carImageIds) {
            this.getCarImages();
          }
        },
        error => {
          console.log(error);
        }
      )
    );
  }

  getCarImages(): void {
    this.carImageIds.forEach(id => 
      this.subscriptions.push(
        this.carService.getCarImage(this.licensePlate, id).subscribe(
          response => {
            // make image from received byte array
            let TYPED_ARRAY = new Uint8Array(response.carImage);
            const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
              return data + String.fromCharCode(byte);
              }, '');
            let base64String = btoa(STRING_CHAR);
            const image = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + base64String);
            // add image to the images array for the carousel
            this.carImages.push(image);
          },
          error => {
            console.log(error);
          }
        )
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
