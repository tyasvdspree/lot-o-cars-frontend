import { Component, Inject, Input, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { Subscription } from 'rxjs';
import { Car } from 'src/app/models/car.model';
import { Make } from 'src/app/enums/make.enum';
import { Color } from 'src/app/enums/color.enum';
import { Transmission } from 'src/app/enums/transmission.enum';
import { Fuel } from 'src/app/enums/fuel.enum';
import { CarBody } from 'src/app/enums/carBody.enum';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '../../models/location.model';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { error } from 'protractor';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.scss']
})
export class EditCarComponent implements OnInit {
  @ViewChild('file') file;
  @Output() onFilesSelected = new EventEmitter<FileList>();
  subscription: Subscription;
  car: Car;
  carImageIds = [];
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
  imageUrls;

  constructor(
    public dialogRef: MatDialogRef<EditCarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { car: Car, subscription: Subscription },
    private carService: CarService,
    private authenticationService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient,

  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authenticationService.isLoggedIn();
    this.subscriptions.push(
      this.route.params.subscribe(parameters => {
        this.car = this.data.car;
        this.licensePlate = this.data.car.numberPlate;
        this.getCarImages();
      })
    );

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/my-cars';

    this.loadData();
    this.makes = this.makes.map(function (make) {
      return { key: Object.keys(Make).filter(x => Make[x] == make), value: make }
    });
    this.colors = this.colors.map(function (color) {
      return { key: Object.keys(Color).filter(x => Color[x] == color), value: color }
    });
    this.transmissions = this.transmissions.map(function (transmission) {
      return { key: Object.keys(Transmission).filter(x => Transmission[x] == transmission), value: transmission }
    });
    this.fuelTypes = this.fuelTypes.map(function (fuel) {
      return { key: Object.keys(Fuel).filter(x => Fuel[x] == fuel), value: fuel }
    });
    this.carBodies = this.carBodies.map(function (body) {
      return { key: Object.keys(CarBody).filter(x => CarBody[x] == body), value: body }
    });
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

  editCar(event, item): void {
    this.subscription = this.carService.editCar(item.car).subscribe(
      response => {
        this.addImage();
        Array.from(this.deletedCarImageIds).forEach(image => {
          this.deleteImageApi(image);
        });
        this.toastr.success('Gewijzigd', 'Success');
        this.dialogRef.close();
      },
      error => {
        this.toastr.error('Wijziging mislukt', 'Error');
        this.dialogRef.close();
      }
    )
  }

  getCarImages(): void {
    this.subscription = this.carService.getCarImageIds(this.licensePlate).subscribe(
      response => {
        this.carImageIds = response;
      },
      error => {
        console.log(error);
      }
    )
  }

  deleteImage(imageId: string): void {
    const index: number = this.carImageIds.indexOf(imageId);
    debugger;
    if (index !== -1) {
      this.carImageIds.splice(index, 1);
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
    this.readImageFile(images);
  }

  readImageFile(images: FileList) {
    if (!this.imageUrls) {
      this.imageUrls = [];
    }
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.imageUrls.push({ path: fileReader.result })
    }
    Array.from(images).forEach(image => {
      fileReader.readAsDataURL(image);
    });
  }

  addImage() {
    this.carService.addImagesToCar(this.car, this.imageFiles)
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
