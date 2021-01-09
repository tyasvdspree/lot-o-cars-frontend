import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {AgreementService} from '../../services/agreement.service';
import {Router} from '@angular/router';
import {Agreement} from '../../models/agreement.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-agreementlist',
  templateUrl: './agreementlist.component.html',
  styleUrls: ['./agreementlist.component.scss']
})
export class AgreementlistComponent implements OnInit {
  agreementSubscription: Subscription;
  displayedColumns = ['carId', 'numberPlate', 'startDate', 'endDate'];
  @Input() renterPerspective = false;
  agreements = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private agreementService: AgreementService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.agreementSubscription = this.agreementService.getAgreements(this.renterPerspective).subscribe(
      response => {
        this.agreements = new MatTableDataSource(response);
        this.agreements.paginator = this.paginator;
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

  // TODO: finish filter
  searchCars(value = ''): void {
    console.log(value);
    this.agreements.filter = value.toLowerCase().trim();
  }
}
