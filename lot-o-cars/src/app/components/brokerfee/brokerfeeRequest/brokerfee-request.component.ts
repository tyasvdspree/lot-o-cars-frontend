import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import {FormControl, FormGroup} from '@angular/forms';
import {BrokerfeeRequest} from 'src/app/models/brokerfee.model';
import {ActivatedRoute, Router} from '@angular/router';
import {from, Subscription} from 'rxjs';
import {BokerfeeService} from 'src/app/services/brokerfee.service';
import {ToastrService} from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import {AuthService} from 'src/app/services/auth.service'

@Component({
  selector: 'app-brokerfee-request',
  templateUrl: './brokerfee-request.component.html',
  styleUrls: ['./brokerfee-request.component.scss']
})
export class BrokerfeeRequestComponent implements OnInit {

  form: FormGroup;
  subscriptions: Subscription[] = [];
  brokerfeeRequest: BrokerfeeRequest = new BrokerfeeRequest();

  constructor(
    private location: Location,
    private brokerfeeService: BokerfeeService,
    private userService: UserService,
    private authenticationService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.authenticationService.isLoggedIn() == false) {
      this.redirectTo('/');
    };

    this.userService.getUser()
      .subscribe(data => {
        this.brokerfeeRequest.user = data;
        console.log(data)
        this.brokerfeeRequest.originalFee = data.brokerFee;
      }
      );
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

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

  createBrokerfeeRequest(): void {
    this.brokerfeeService.createBrokerFeeRequest(this.brokerfeeRequest).subscribe(
      response => {
        this.toastr.success('Overeenkomst gemaakt');
        this.router.navigateByUrl(`/brokerfeeRequestUserList`);
      }
    );
  }
}
