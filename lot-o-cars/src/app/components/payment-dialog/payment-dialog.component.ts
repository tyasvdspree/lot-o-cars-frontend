import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Bank} from '../../enums/bank.enum';
import {AgreementService} from '../../services/agreement.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.scss']
})
export class PaymentDialogComponent implements OnInit {
  banks: any[] = [];
  bank: any;
  subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<PaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {agreementId: number},
    private agreementService: AgreementService
  ) { }

  ngOnInit(): void {
    this.loadData();
    this.banks = this.banks.map(function (bank) {
      return { key: Object.keys(Bank).filter(x => Bank[x] == bank), value: bank }
    });
    console.log(this.banks);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private loadData(): void {
    this.loadSelectionList(this.agreementService.getBanks, this.agreementService, 'banks');
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

  //todo ondestroy
}
