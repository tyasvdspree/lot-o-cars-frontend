import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
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
          this.car = response;
        },
        error => {
          console.log(error);
        }
      )
    );
  }

  // first load the id's of the images
  getCarImageIds(): void {
    this.subscriptions.push(
      this.carService.getCarImageIds(this.licensePlate).subscribe(
        response => {
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

  // after id's are loaded, load each image one by one (async)
  getCarImages(): void {
    this.carImageIds.forEach(id => 
      this.subscriptions.push(
        this.carService.getCarImage(this.licensePlate, id).subscribe(
          response => {
            const image = this.convertByteArrayToImage(response.carImage);
            this.carImages.push(image);
          },
          error => {
            console.log(error);
          }
        )
      )
    );
  }

  convertByteArrayToImage(byteArray: any): SafeUrl {
    let TYPED_ARRAY = new Uint8Array(byteArray);
    const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
      return data + String.fromCharCode(byte);
      }, '');
    let base64String = btoa(STRING_CHAR);
    const image = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + base64String);
    return image;
  }

  onDateSelected(selectedDate: Date): void {
    console.log('selected date by child component: ' + selectedDate.toString());
  }

  onButtonClicked(): void {
    this.router.navigateByUrl(`/agreement/${this.car.numberPlate}`);
  }
}
