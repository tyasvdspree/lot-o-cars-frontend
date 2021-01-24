import { Component, Input, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {BrokerfeeService} from 'src/app/services/brokerfee.service';
import {Router} from '@angular/router';
import {BrokerfeeRequest} from 'src/app/models/brokerfee.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {getStatusText, Status} from 'src/app/enums/status.enum';

@Component({
  selector: 'app-brokerfee-list',
  templateUrl: './brokerfee-list.component.html',
  styleUrls: ['./brokerfee-list.component.scss']
})
export class BrokerfeeListComponent implements OnInit {
  agreementSubscription: Subscription;
  displayedColumns = ['brokerfeeRequestId', ''];
  @Input() adminPerspective = false;
  brokerfeeRequests = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private brokerFeeService: BrokerfeeService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.agreementSubscription = this.brokerFeeService.getBrokerFeeRequests(this.adminPerspective).subscribe(
      response => {
        this.brokerfeeRequests.data = response;
        this.brokerfeeRequests.filterPredicate = (data, filter: string)  => {
          const accumulator = (currentTerm, key) => {
            return this.nestedFilterCheck(currentTerm, data, key);
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };
        this.brokerfeeRequests.paginator = this.paginator;
      },
      error => {
        console.log(error);
      }
    );
  }

  onRowClicked(brokerfeeRequest: BrokerfeeRequest): void {
    console.log('Row clicked: ', brokerfeeRequest);
    this.router.navigateByUrl(`/agreementdetails/${brokerfeeRequest.id}`);
  }

  searchCars(value = ''): void {
    this.brokerfeeRequests.filter = value.toLowerCase().trim();
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
