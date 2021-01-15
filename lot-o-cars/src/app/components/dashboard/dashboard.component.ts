import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as c3 from 'c3';
import { ToastrService } from 'ngx-toastr';
import { AgreementService } from 'src/app/services/agreement.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userName = '';
  startYear = 2020;
  endYear = 2021;

  agreements: [];

  chartRevenue: any;
  chartProfitAndCosts: any;


  constructor(
    private userService: UserService,
    private agreementService: AgreementService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.showChartRevenue();
    this.showChartProfitAndCosts();
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.getCurrentUserId();
  }

  getCurrentUserId(): void {
    this.userService.getUser().subscribe(
      user => {
        this.userName = user.username;
        console.log('user: ' + JSON.stringify(user));
        this.getAgreementData();
      },
      error => {
        this.toastrService.error('Fout bij ophalen gebruikersgegevens.');
      }
    );
  }

  getAgreementData(): void {
    this.agreementService.getDashboardAgreements(this.userName, this.startYear, this.endYear).subscribe(
      data => {
        this.agreements = data;
        console.log('dashboard data: ', data);
        this.setChartData();
      },
      error => {
        this.toastrService.error('Fout bij ophalen van gegevens.');
      }
    );
  }

  setChartData(): void {
    this.setChartRevenueData();
    this.setChartProfitAndCostsData();
  }

  setChartRevenueData(): void {
    const prop = 'totalPrice';
    const startYearTotals = this.getYearTotals(this.startYear, prop);
    const endYearTotals = this.getYearTotals(this.endYear, prop);

    this.chartRevenue.load({
        columns: [startYearTotals, endYearTotals]
    });
    this.chartRevenue.unload({
        ids: ['data1', 'data2']
    });
  }

  setChartProfitAndCostsData(): void {
    let prop = 'profit';
    const profitTotals = this.getYearTotals(this.startYear, prop);
    profitTotals[0] = 'winst ' + profitTotals[0];
    prop = 'brokerCosts';
    const costTotals = this.getYearTotals(this.startYear, prop);
    costTotals[0] = 'kosten ' + costTotals[0];

    this.chartProfitAndCosts.load({
        columns: [profitTotals, costTotals]
      });
    this.chartProfitAndCosts.unload({
        ids: ['data3', 'data4']
      });
  }


  getYearTotals(year: number, prop: string): Array<any> {
    let array = new Array<any>();
    array.push(year.toString());
    for (let i = 1; i <= 12; i++) {
      array.push(this.getMonthTotal(year, i, prop));
    }
    return array;
  }

  getMonthTotal(year: number, month: number, prop: string): number {
    return this.agreements.reduce((sum, a) => 
      a['year'] === year && a['month'] === month ? sum + a[prop] : sum + 0, 0
    );
  }


  showChartRevenue() {
    this.chartRevenue = c3.generate({
      bindto: '#chartRevenue',
      data: {
        columns: [
          ['data1', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          ['data2', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
      },
      axis: {
        x: {
          type: 'category',
          categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
          show: true
        }
      },
      tooltip: {
        show: false
      },
      grid: {
        x: {
            show: false
        },
        y: {
            show: true
        }
    }
    });
  }

  showChartProfitAndCosts() {
    this.chartProfitAndCosts = c3.generate({
      bindto: '#chartProfitAndCosts',
      data: {
        columns: [
          ['data3', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          ['data4', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
      },
      axis: {
        x: {
          type: 'category',
          categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
          show: true
        }
      },
      tooltip: {
        show: false
      },
      grid: {
        x: {
            show: false
        },
        y: {
            show: true
        }
    }
    });
  }

}
