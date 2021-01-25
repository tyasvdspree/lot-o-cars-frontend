import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Bank} from '../../../enums/bank.enum';
import {AgreementService} from '../../../services/agreement-service/agreement.service';
import {Subscription} from 'rxjs';
import {Agreement} from '../../../models/agreement.model';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.scss']
})
export class PaymentDialogComponent implements OnInit, OnDestroy {
  banks: any[] = [];
  bank: Bank;
  subscriptions: Subscription[] = [];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  agreement: Agreement;

  constructor(
    public dialogRef: MatDialogRef<PaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {agreement: Agreement},
    private agreementService: AgreementService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.agreement = this.data.agreement
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.loadData();
    this.banks = this.banks.map(bank => ({key: Object.keys(Bank).filter(x => Bank[x] === bank), value: bank}));
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

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.forEach(x => x.unsubscribe());
    }
  }

  changeBank() {
    this.bank = this.firstFormGroup.controls.firstCtrl.value;
  }

  finishPayment() {
    this.agreementService.setAgreementPayment(this.agreement).subscribe(
      data => {
        this.dialogRef.close(data);
        this.toastr.success('Bedankt voor uw betaling');
      },
      error => {
        this.toastr.error('Fout bij ophalen van gegevens');
      }
    );
  }
}
