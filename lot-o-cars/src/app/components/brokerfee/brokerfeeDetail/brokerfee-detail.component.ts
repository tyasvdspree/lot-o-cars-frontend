import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrokerfeeRequest } from 'src/app/models/brokerfee.model';
import { BokerfeeService } from 'src/app/services/brokerfee.service';
import { User, isAdminUser } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { from } from 'rxjs';
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
  brokerfeeRequest: BrokerfeeRequest;
  currentStatus: string;
  brokerfeeRequestId: Number;
  reason: String;
  isAdminUser: Boolean

  // mode dependent variables
  isPending: boolean;

  constructor(
    private location: Location,
    private service: BokerfeeService,
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
    this.isAdminUser = isAdminUser(user);
  }

  getBrokerfeeRequestIdFromUrl() {
    this.subscriptions.push(
      this.route.params.subscribe(parameters => {
        this.brokerfeeRequestId = parameters.id;
        this.loadBrokerfeeRequest(parameters.id);
      })
    );
  }

  loadBrokerfeeRequest(id: number) {
    this.subscriptions.push(
      this.service.getBrokerFeeRequestById(id).subscribe(
        agreement => this.setBrokerfeeRequest(agreement),
        error => this.toastr.error(error, 'Fout bij ophalen huurovereenkomst'),
        () => console.log(this.brokerfeeRequest)
      )
    );
  }

  setBrokerfeeRequest(brokerfeeRequest: BrokerfeeRequest) {
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
          brokerfeeRequest => this.setBrokerfeeRequest(brokerfeeRequest),
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
          brokerfeeRequest => this.setBrokerfeeRequest(brokerfeeRequest),
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
        brokerfeeRequest => this.setBrokerfeeRequest(brokerfeeRequest),
        error => this.toastr.error(error, 'Fout bij accepteren huurovereenkomst'),
        () => console.log(this.brokerfeeRequest)
      )
    );
  }
}
