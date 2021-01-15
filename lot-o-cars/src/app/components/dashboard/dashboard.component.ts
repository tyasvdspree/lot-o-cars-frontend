import { Component, OnInit } from '@angular/core';
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
  revenueYears = [];
  profitAndCostsYears = [];
  startYear: number;
  endYear: number;

  agreements: [];

  chartRevenue: any;
  chartProfitAndCosts: any;
  chartUnpaidAgreements: any;


  constructor(
    private userService: UserService,
    private agreementService: AgreementService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.showChartRevenue();
    this.showChartProfitAndCosts();
    this.showChartUnpaidAgreements();
    this.loadDashboardData();
  }

  revenueYearChange(yearItem: any) {
    if (yearItem.checked) {
      this.addRevenueYear(yearItem.year);
    } else {
      this.removeRevenueYear(yearItem.year);
    }
  }

  profitAndCostsYearChange(yearItem: any) {
    if (yearItem.checked) {
      this.addProfitAndCostsYear(yearItem.year);
    } else {
      this.removeProfitAndCostsYear(yearItem.year);
    }
  }


  loadDashboardData(): void {
    this.initYears();
    this.getCurrentUserId();
  }

  initYears() {
    const numOfYears = 5;
    let year = new Date().getFullYear();
    this.startYear = year - numOfYears;
    this.endYear = year;

    for (let i = 0; i < numOfYears; i++) {
      this.revenueYears.push({year: year, text: year.toString(), checked: i < 2 ? true : false});
      this.profitAndCostsYears.push({year: year, text: year.toString(), checked: i === 1 ? true : false});
      year--;
    }
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
        this.initChartData();
      },
      error => {
        this.toastrService.error('Fout bij ophalen van gegevens.');
      }
    );
  }

  initChartData(): void {
    this.initChartRevenueData();
    this.initChartProfitAndCostsData();
    this.initUnpaidAgreementsData();
  }

  initChartRevenueData(): void {
    this.revenueYears.forEach(item => {
      if (item.checked) {
        this.addRevenueYear(item.year);
      }
    });
  }

  addRevenueYear(year: number) {
    const prop = 'totalPrice';
    const yearTotals = this.getYearTotals(year, prop);
    this.chartRevenue.load({
      columns: [yearTotals]
    });
  }

  removeRevenueYear(year: number) {
    this.chartRevenue.unload({
      ids: [year.toString()]
    });
  }


  initChartProfitAndCostsData(): void {
    this.profitAndCostsYears.forEach(item => {
      if (item.checked) {
        this.addProfitAndCostsYear(item.year);
      }
    });
  }

  addProfitAndCostsYear(year: number) {
    let prop = 'profit';
    const profitTotals = this.getYearTotals(year, prop);
    profitTotals[0] = 'winst ' + profitTotals[0];

    prop = 'brokerCosts';
    const costTotals = this.getYearTotals(year, prop);
    costTotals[0] = 'kosten ' + costTotals[0];

    this.chartProfitAndCosts.load({
        columns: [profitTotals, costTotals]
    });
  }

  removeProfitAndCostsYear(year: number) {
    this.chartProfitAndCosts.unload({
      ids: ['winst ' + year, 'kosten ' + year]
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

  getUnpaidTotal(): number {
    return this.agreements.reduce((sum, a) => 
      a['payed'] === false ? sum + 1 : sum + 0, 0
    );
  }


  initUnpaidAgreementsData() {
    const numOfUnpaidAgreements = this.getUnpaidTotal();

    this.chartUnpaidAgreements.load({
      columns: [['aantal', numOfUnpaidAgreements]]
    }); 
  }


  showChartRevenue() {
    this.chartRevenue = c3.generate({
      bindto: '#chartRevenue',
      data: {
        columns: []
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
        columns: []
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

  showChartUnpaidAgreements() {
    this.chartUnpaidAgreements = c3.generate({
      bindto: '#chartUnpaidAgreements',
      data: {
          columns: [
              ['aantal', 0]
          ],
          type: 'gauge'
      },
      gauge: {
        label: {
          format: (value) => value,
          show: false 
        },
      },
      size: {
          height: 200
      }
    });
  }

}
