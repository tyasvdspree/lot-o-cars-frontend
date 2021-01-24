import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrokerfeeRequest } from 'src/app/models/brokerfee.model';
import { BrokerfeeService } from 'src/app/services/brokerfee-service/brokerfee.service';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user-service/user.service';
import { isPending, getStatusText, Status } from 'src/app/enums/status.enum';

@Component({
  selector: 'app-brokerfee-detail',
  templateUrl: './brokerfee-detail.component.html',
  styleUrls: ['./brokerfee-detail.component.scss']
})
export class BrokerfeeDetailComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  // model objects
  user: User;
  brokerfeeRequest: BrokerfeeRequest = new BrokerfeeRequest();
  currentStatus: string;
  brokerfeeRequestId: number;
  reason: string;

  // mode dependent variables
  isPending: boolean;

  constructor(
    private location: Location,
    private service: BrokerfeeService,
    private userService: UserService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router) 
  { }

  ngOnInit(): void {
    this.getBrokerfeeRequestIdFromUrl();
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
  }

  getBrokerfeeRequestIdFromUrl() {
    this.subscriptions.push(
      this.route.params.subscribe(parameters => {
        this.brokerfeeRequestId = parameters.id;
        this.loadAgreement(parameters.id);
      })
    );
  }

  loadAgreement(id: number) {
    this.subscriptions.push(
      this.service.getBrokerFeeRequestById(id).subscribe(
        agreement => this.setAgreement(agreement),
        error => this.toastr.error(error, 'Fout bij ophalen huurovereenkomst'),
        () => console.log(this.brokerfeeRequest)
      )
    );
  }

  setAgreement(brokerfeeRequest: BrokerfeeRequest) {
    this.brokerfeeRequest = brokerfeeRequest;
    this.currentStatus = this.getTranslatedStatus(this.brokerfeeRequest.status);
    this.isPending = isPending(this.brokerfeeRequest.status);
    this.loadUser();
  }

  getTranslatedStatus(status: Status) {
    return getStatusText(status);
  }

  calcTotalPrice(numOfDays: number, price: number): number {
    return numOfDays * price;
  }

  cancelBrokerfeeRequest() {
    if (this.reason) {
      this.subscriptions.push(
        this.service.setBrokerFeeRequestStatus(this.brokerfeeRequestId, 'CANCELED', this.reason).subscribe(
          brokerfeeRequest => this.setAgreement(brokerfeeRequest),
          error => this.toastr.error(error, 'Fout bij annuleren huurovereenkomst'),
          () => console.log(this.brokerfeeRequest)
        )
      );
    } else {
      this.toastr.warning('Vul een toelichting voor de annulering in.');
    }
  }

  rejectBrokerfeeRequest() {
    if (this.reason) {
      this.subscriptions.push(
        this.service.setBrokerFeeRequestStatus(this.brokerfeeRequestId, 'CANCELED', this.reason).subscribe(
          brokerfeeRequest => this.setAgreement(brokerfeeRequest),
          error => this.toastr.error(error, 'Fout bij afwijzen huurovereenkomst'),
          () => console.log(this.brokerfeeRequest)
        )
      );
    } else {
      this.toastr.warning('Vul een toelichting voor de afwijzing in.');
    }
  }

  approveBrokerfeeRequest() {
    this.subscriptions.push(
      this.service.setBrokerFeeRequestStatus(this.brokerfeeRequestId, 'APPROVED', this.reason).subscribe(
        brokerfeeRequest => this.setAgreement(brokerfeeRequest),
        error => this.toastr.error(error, 'Fout bij accepteren huurovereenkomst'),
        () => console.log(this.brokerfeeRequest)
      )
    );
  }
}
