import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Car } from 'src/app/models/car.model';

@Component({
  selector: 'app-deactivate-car-dialog',
  templateUrl: './deactivate-car-dialog.component.html',
  styleUrls: ['./deactivate-car-dialog.component.scss']
})
export class DeactivateCarDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeactivateCarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {car: Car}
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
