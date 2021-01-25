import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Car } from 'src/app/models/car.model';
import {AgreementService} from '../../../services/agreement-service/agreement.service';
import {Agreement} from '../../../models/agreement.model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-deactivate-car-dialog',
  templateUrl: './deactivate-car-dialog.component.html',
  styleUrls: ['./deactivate-car-dialog.component.scss']
})
export class DeactivateCarDialogComponent implements OnInit {

  agreement: Agreement = new Agreement();
  startDate: Date;
  endDate: Date;

  constructor(
    public dialogRef: MatDialogRef<DeactivateCarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {car: Car},
    private agreementService: AgreementService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if (!this.data.car) {
      this.data.car = new Car();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createDeactivationAgreement(): void {

    if (!this.startDate || !this.endDate){
      this.toastr.error('Geen periode geselecteerd');
    } else {
      this.agreement.car = this.data.car;
      this.agreement.startDate = this.startDate;
      this.agreement.endDate = this.endDate;
      this.agreementService.createAgreement(this.agreement).subscribe(
        response => {
          this.toastr.success(this.getCarDescription(this.data.car));
          this.dialogRef.close();
        }
      );
    }
  }

  getCarDescription(car: Car) {
    if (car && car.make && car.model) {
      return `${car.make} ${car.model} gedeactiveerd`;
    } else {
      return 'auto gedeactiveerd';
    }
  }

  onStartDateChanged(startDate): void {
    this.startDate = new Date(startDate.value);
  }

  onEndDateChanged(endDate): void {
    this.endDate = new Date(endDate.value);
  }
}
