import {Component, Inject, Input, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Car } from 'src/app/models/car.model';
import {AgreementService} from '../../services/agreement.service';
import {Agreement} from '../../models/agreement.model';
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
          this.toastr.success(this.data.car.make + ' ' + this.data.car.model + ' gedeactiveerd');
          this.dialogRef.close();
        }
      );
    }
  }

  onStartDateChanged(startDate): void {
    this.startDate = new Date(startDate.value);
  }

  onEndDateChanged(endDate): void {
    this.endDate = new Date(endDate.value);
  }
}
