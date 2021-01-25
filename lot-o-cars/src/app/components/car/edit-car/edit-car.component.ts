import { Component, Inject, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/services/car-service/car.service';
import { Subscription } from 'rxjs';
import { Car } from 'src/app/models/car.model';
import { Make } from 'src/app/enums/make.enum';
import { Color } from 'src/app/enums/color.enum';
import { Transmission } from 'src/app/enums/transmission.enum';
import { Fuel } from 'src/app/enums/fuel.enum';
import { CarBody } from 'src/app/enums/car-body.enum';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Location } from '../../../models/location.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.scss']
})
export class EditCarComponent implements OnInit {
  @ViewChild('file') file;
  @Output() onFilesSelected = new EventEmitter<FileList>();
  subscription: Subscription;
  car: Car = new Car();
  carImageIds = [];
  carDescription: string = '';
  deletedCarImageIds = [];
  carImages = [];
  makes: any[] = [];
  colors: any[] = [];
  transmissions: any[] = [];
  fuelTypes: any[] = [];
  carBodies: any[] = [];
  subscriptions: Subscription[] = [];
  isLoggedIn: boolean;
  licensePlate: string;
  location: Location;
  returnUrl: string;
  imageFiles: FileList;
  imageUrls = [];

  constructor(
    public dialogRef: MatDialogRef<EditCarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { car: Car, subscription: Subscription },
    private carService: CarService,
    private authenticationService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authenticationService.isLoggedIn();
    this.subscriptions.push(
      this.route.params.subscribe(parameters => {
        this.car = this.data.car;
        if (this.data.car) {
          this.licensePlate = this.data.car.numberPlate;
          this.carDescription = `${this.data.car.make} - ${this.data.car.numberPlate}`
        }
        this.getCarImages();
      })
    );

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/my-cars';
    this.loadData();
  }

  private loadData(): void {
    this.loadSelectionList(this.carService.getMakes, this.carService, 'makes');
    this.loadSelectionList(this.carService.getColors, this.carService, 'colors');
    this.loadSelectionList(this.carService.getTransmissions, this.carService, 'transmissions');
    this.loadSelectionList(this.carService.getFuelTypes, this.carService, 'fuelTypes');
    this.loadSelectionList(this.carService.getCarBody, this.carService, 'carBodies');
  }

  private loadSelectionList(serviceMethod: any, service: any, localProp: any): void {
    this.subscriptions.push(
      serviceMethod.call(service).subscribe(
        values => {
          this[localProp] = values;
        }
      )
    );
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

  editCar(): void {
    debugger;
    this.car.make = Object.keys(Make).filter(x => Make[x] == this.car.make)[0];
    this.car.color = Object.keys(Color).filter(x => Color[x] == this.car.color)[0];
    this.car.transmission = Object.keys(Transmission).filter(x => Transmission[x] == this.car.transmission)[0];
    this.car.fuel = Object.keys(Fuel).filter(x => Fuel[x] == this.car.fuel)[0];
    this.car.body = Object.keys(CarBody).filter(x => CarBody[x] == this.car.body)[0]

    this.subscription = this.carService.editCar(this.car).subscribe(
      response => {
        this.car.make = Make[this.car.make];
        this.car.color = Color[this.car.color];
        this.car.transmission = Transmission[this.car.transmission];
        this.car.fuel = Fuel[this.car.fuel];
        this.car.body = CarBody[this.car.body];

        this.addImage();
        Array.from(this.deletedCarImageIds).forEach(image => {
          this.deleteImageApi(image);
        });
        this.toastr.success('Gewijzigd', 'Success');
        this.dialogRef.close();
      },
      error => {
        this.car.make = Make[this.car.make];
        this.car.color = Make[this.car.color];
        this.car.transmission = Make[this.car.transmission];
        this.car.fuel = Make[this.car.fuel];
        this.car.body = Make[this.car.body];
        this.toastr.error('Wijziging mislukt', 'Error');
        this.dialogRef.close();
      }
    )
  }

  getCarImages(): void {
    this.subscription = this.carService.getCarImageIds(this.licensePlate).subscribe(
      response => {
        this.carImageIds = response;
        this.getImageUrls();
      },
      error => {
        console.log(error);
      }
    )
  }

  getImageUrls(): string {
    let numberPlate = this.car.numberPlate;
    if (this.carImageIds.length > 0) {
      for (var i = 0; i < this.carImageIds.length; i++) {
        this.imageUrls[i] = this.carService.getCarImageUrl(numberPlate, this.carImageIds[i]);
      }
    }
    else {
      return "assets/img/app/maincar.jpg";
    }
  }

  deleteImage(imageId: string): void {
    const index: number = this.carImageIds.indexOf(imageId);
    if (index !== -1) {
      debugger;
      this.carImageIds.splice(index, 1);
      this.imageUrls.splice(index, 1);
    }
    this.deletedCarImageIds.push(imageId);
  }

  deleteImageApi(imageId: string): void {
    this.subscription = this.carService.deleteCarImage(imageId).subscribe(
      response => {
        console.log("deleted " + imageId)
      },
      error => {
        console.log("error")
      }
    );
  }

  receiveSelectedImageFiles(images: FileList) {
    this.imageFiles = images;
  }

  addImage() {
    this.carService.addImagesToCar(this.car, this.imageFiles)
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
