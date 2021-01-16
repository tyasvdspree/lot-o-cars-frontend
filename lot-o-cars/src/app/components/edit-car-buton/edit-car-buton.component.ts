import {Component, Inject, Input, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Car } from 'src/app/models/car.model';

@Component({
  selector: 'app-edit-car-buton',
  templateUrl: './edit-car-buton.component.html',
  styleUrls: ['./edit-car-buton.component.scss']
})
export class EditCarButonComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditCarButonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {car: Car},
  ) { }

  ngOnInit(): void {
  }

  editCar(): void  {
    console.log("fds")
  }
}
