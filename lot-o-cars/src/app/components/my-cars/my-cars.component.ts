import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Car } from 'src/app/models/car.model';
import { CarService } from 'src/app/services/car.service';
import { DeactivateCarDialogComponent } from '../deactivate-car-dialog/deactivate-car-dialog.component';
import { EditCarComponent } from '../edit-car/edit-car.component'

@Component({
  selector: 'app-my-cars',
  templateUrl: './my-cars.component.html',
  styleUrls: ['./my-cars.component.scss']
})
export class MyCarsComponent implements OnInit, OnDestroy {

  carServiceSubscription: Subscription;
  displayedColumns = ['numberPlate', 'make', 'model', 'deactivateCar', 'editCar'];
  ownCars: Car[];

  constructor(
    private carService: CarService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.carServiceSubscription = this.carService.getOwn().subscribe(
      response => {
        this.ownCars = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.carServiceSubscription) {
      this.carServiceSubscription.unsubscribe();
    }
  }

  deactivateCar(car: Car): void {
    const dialogRef = this.dialog.open(DeactivateCarDialogComponent, {
      width: '550px',
      data: {car}
    });
  }

  editCar(car: Car): void {
    const dialogRef = this.dialog.open(EditCarComponent, {
      width: '550px',
      data: {car}
    });
  } 

}
