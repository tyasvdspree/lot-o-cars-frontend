import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { BrokerfeeRequest } from 'src/app/models/brokerfee.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BrokerfeeService } from 'src/app/services/brokerfee-service/brokerfee.service';
import { ToastrService } from 'ngx-toastr';

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
    private brokerfeeService: BrokerfeeService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
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

  createBrokerfeeRequest(): void {
    this.brokerfeeService.createBrokerFeeRequest(this.brokerfeeRequest).subscribe(
      response => {
        this.toastr.success('Overeenkomst gemaakt');
        this.router.navigateByUrl(`/hirehistory`); // TODO: navigate to agreement detail
      }
    );
  }
}
