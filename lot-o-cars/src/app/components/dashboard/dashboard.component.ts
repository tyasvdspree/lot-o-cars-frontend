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
  chartCarRevenuePart: any;

  numOfUnpaidAgreements: number = 0;
  numOfPendingAgreements: number = 0;

  constructor(
    private userService: UserService,
    private agreementService: AgreementService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.showCharts();
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
    this.initYearFilters();
    this.getCurrentUserIdAndLoadAgreements();
  }

  initYearFilters() {
    // initialize year filters
    // show the last n years to filter the agreements on
    const numOfYears = 5;

    let currentYear = new Date().getFullYear();
    this.startYear = currentYear - numOfYears;
    this.endYear = currentYear;

    for (let i = 0; i < numOfYears; i++) {
      this.revenueYears.push({year: currentYear, text: currentYear.toString(), checked: i < 2 ? true : false});
      this.profitAndCostsYears.push({year: currentYear, text: currentYear.toString(), checked: i === 1 ? true : false});
      currentYear--;
    }
  }

  getCurrentUserIdAndLoadAgreements(): void {
    this.userService.getUser().subscribe(
      user => {
        this.userName = user.username;
        this.getAgreementDataFromApi();
      },
      error => {
        this.toastrService.error('Fout bij ophalen gebruikersgegevens.');
      }
    );
  }

  getAgreementDataFromApi(): void {
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
    this.initSpecialData();
  }

  initChartRevenueData(): void {
    this.revenueYears.forEach(item => {
      if (item.checked) {
        this.addRevenueYear(item.year);
      }
    });
  }

  initChartProfitAndCostsData(): void {
    this.profitAndCostsYears.forEach(item => {
      if (item.checked) {
        this.addProfitAndCostsYear(item.year);
      }
    });
  }

  initSpecialData() {
    this.numOfPendingAgreements = this.getPendingTotal();
    this.numOfUnpaidAgreements = this.getUnpaidTotal();
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

  getPendingTotal(): number {
    return this.agreements.reduce((sum, a) => 
      a['status'] === "PENDING" ? sum + 1 : sum + 0, 0
    );
  }


  showCharts() {
    this.showChartRevenue();
    this.showChartProfitAndCosts();
    this.showChartCarRevenuePart();
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

  showChartCarRevenuePart() {
    this.chartCarRevenuePart = c3.generate({
      bindto: '#chartCarRevenuePart',
      data: {
          columns: [
              ['H-735-GT', 30],
              ['3-ZNL-32', 120],
          ],
          type : 'pie'
      }
  });
  }

}
