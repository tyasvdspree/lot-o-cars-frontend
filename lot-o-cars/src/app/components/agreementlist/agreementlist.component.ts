import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {AgreementService} from '../../services/agreement.service';
import {Router} from '@angular/router';
import {Agreement} from '../../models/agreement.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {getStatusText, Status} from '../../enums/status.enum';

@Component({
  selector: 'app-agreementlist',
  templateUrl: './agreementlist.component.html',
  styleUrls: ['./agreementlist.component.scss']
})
export class AgreementlistComponent implements OnInit {
  agreementSubscription: Subscription;
  displayedColumns = ['carId', 'numberPlate', 'startDate', 'endDate', 'status'];
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
        this.agreements.data = response;
        this.agreements.filterPredicate = (data, filter: string)  => {
          const accumulator = (currentTerm, key) => {
            return this.nestedFilterCheck(currentTerm, data, key);
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };
        this.agreements.paginator = this.paginator;
      },
      error => {
        console.log(error);
      }
    );
  }

  onRowClicked(agreement: Agreement): void {
    console.log('Row clicked: ', agreement);
    this.router.navigateByUrl(`/agreementdetails/${agreement.id}`);
  }

  searchCars(value = ''): void {
    this.agreements.filter = value.toLowerCase().trim();
  }

  nestedFilterCheck(search, data, key): any {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }

  getStatusDisplayText(status: Status) {
    return getStatusText(status);
  }
}
