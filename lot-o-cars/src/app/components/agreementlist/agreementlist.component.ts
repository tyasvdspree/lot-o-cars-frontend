import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AgreementService} from '../../services/agreement.service';
import {Router} from '@angular/router';
import {Agreement} from '../../models/agreement.model';

@Component({
  selector: 'app-agreementlist',
  templateUrl: './agreementlist.component.html',
  styleUrls: ['./agreementlist.component.scss']
})
export class AgreementlistComponent implements OnInit {
  agreementSubscription: Subscription;
  displayedColumns = ['id', 'carId', 'startDate', 'endDate'];
  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;
  @Input() renterPerspective = false;
  agreements = [];

  constructor(
    private agreementService: AgreementService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.agreementSubscription = this.agreementService.getAgreements(this.renterPerspective).subscribe(
      response => {
        console.log(response);
        this.agreements = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  onRowClicked(agreement: Agreement): void {
    console.log('Row clicked: ', agreement);
    this.router.navigateByUrl(`/agreement/${agreement.id}`);
  }

}
