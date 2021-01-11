import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AgreementService } from 'src/app/services/agreement.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Agreement } from 'src/app/models/agreement.model';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Status } from 'src/app/enums/status.enum';

@Component({
  selector: 'app-agreementdetails',
  templateUrl: './agreementdetails.component.html',
  styleUrls: ['./agreementdetails.component.scss']
})
export class AgreementDetailsComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  // model objects
  user: User;
  agreement: Agreement;
  currentStatus: string;
  agreementId: number;
  reason: string;

  // price variables
  numOfDays: number = 0;
  totalPrice: number = 0;

  // mode dependent variables
  isPending: boolean;
  isRenter: boolean;
  isRentee: boolean;


  constructor(
    private location: Location,
    private service: AgreementService,
    private userService: UserService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.getAgreementIdFromUrl();
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.forEach(x => x.unsubscribe());
    }
  }


  navigateBack() {
    // back to list button is clicked
    this.location.back();
  }

  loadUser() {
    // get current user to set renter and rentee
    this.subscriptions.push(
      this.userService.getUser().subscribe(
        currentUser => this.setUser(currentUser),
        error => this.toastr.error(error, 'Fout bij ophalen gebruiker'),
        () => console.log(this.user)
      )
    );
  }

  setUser(user: User) {
    this.user = user;
    this.isRenter = this.agreement.renter.username === user.username;
    this.isRentee = this.agreement.rentee.username === user.username;
  }

  getAgreementIdFromUrl() {
    this.subscriptions.push(
      this.route.params.subscribe(parameters => {
        this.agreementId = parameters.id;
        this.loadAgreement(parameters.id);
      })
    );
  }

  loadAgreement(id: number) {
    this.subscriptions.push(
      this.service.getAgreementById(id).subscribe(
        agreement => this.setAgreement(agreement),
        error => this.toastr.error(error, 'Fout bij ophalen huurovereenkomst'),
        () => console.log(this.agreement)
      )
    );
  }

  setAgreement(agreement: Agreement) {
    this.agreement = agreement;
    this.currentStatus = this.getTranslatedStatus(this.agreement.status);
    this.isPending = this.agreement.status + '' == 'PENDING';
    console.log('status: ', this.agreement.status);
    console.log('is pending: ', this.isPending);
    this.numOfDays = this.calcDaysBetweenDates(this.agreement.startDate, this.agreement.endDate);
    this.totalPrice = this.calcTotalPrice(this.agreement.rentPricePerHour, this.numOfDays);
    this.loadUser();
  }

  getTranslatedStatus(status: string) {
    switch(status){
      case 'PENDING':
        return 'ingediend';
      case 'APPROVED':
        return 'goedgekeurd'
      case 'CANCELED':
        return 'geannuleerd';
      default:
        return 'afgehandeld';
    }
  }

  calcDaysBetweenDates(startDate: Date, endDate: Date): number {
    if (!startDate || !endDate) {
      return 0;
    }
    const oneDayInMs = 1000 * 60 * 60 * 24;
    const start = Date.parse(startDate + '');
    const end = Date.parse(endDate + '');
    const numberOfDays = ((end - start) / oneDayInMs) + 1;
    return numberOfDays;
  }

  calcTotalPrice(numOfDays: number, price: number): number {
    return numOfDays * price;
  }

  cancelAgreement() {
    if (this.reason) {
      this.subscriptions.push(
        this.service.setAgreementStatus(this.agreementId, 'CANCELED', this.reason).subscribe(
          agreement => this.setAgreement(agreement),
          error => this.toastr.error(error, 'Fout bij annuleren huurovereenkomst'),
          () => console.log(this.agreement)
        )
      );
    } else {
      this.toastr.warning('Vul een toelichting voor de annulering in.');
    }
  }

  rejectAgreement() {
    if (this.reason) {
      this.subscriptions.push(
        this.service.setAgreementStatus(this.agreementId, 'CANCELED', this.reason).subscribe(
          agreement => this.setAgreement(agreement),
          error => this.toastr.error(error, 'Fout bij afwijzen huurovereenkomst'),
          () => console.log(this.agreement)
        )
      );
    } else {
      this.toastr.warning('Vul een toelichting voor de afwijzing in.');
    }
  }

  approveAgreement() {
    this.subscriptions.push(
      this.service.setAgreementStatus(this.agreementId, 'APPROVED', this.reason).subscribe(
        agreement => this.setAgreement(agreement),
        error => this.toastr.error(error, 'Fout bij accepteren huurovereenkomst'),
        () => console.log(this.agreement)
      )
    );
  }

}
