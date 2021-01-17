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
  years = [];
  startYear: number;
  endYear: number;
  includePending: boolean = true;
  includeUnpayed: boolean = true;

  agreements: [];

  chartRevenue: any;
  chartProfitAndCosts: any;
  chartCarRevenuePart: any;

  yearTotals: any[] = [];
  revenueTotal: number = 0;
  costsTotal: number = 0;
  profitTotal: number = 0;

  numOfUnpaidAgreements: number = 0;
  numOfPendingAgreements: number = 0;
  avgYearRevenue: number = 0;

  constructor(
    private userService: UserService,
    private agreementService: AgreementService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.showCharts();
    this.loadDashboardData();
  }

  yearFilterChanged(yearItem: any) {
    if (yearItem.checked) {
      this.addRevenueYear(yearItem.year);
      this.addProfitAndCostsYear(yearItem.year);
    } else {
      this.removeRevenueYear(yearItem.year);
      this.removeProfitAndCostsYear(yearItem.year);
    }
    this.initChartCarRevenuePart();
  }

  filterChanged() {
    this.clearCharts();
    this.initChartData();
  }

  loadDashboardData(): void {
    this.initYearFilter();
    this.getCurrentUserIdAndLoadAgreements();
  }

  initYearFilter() {
    // initialize year filters
    // show the last n years to filter the agreements on
    const numOfYears = 10;

    let currentYear = this.getCurrentYear();
    this.startYear = currentYear - numOfYears;
    this.endYear = currentYear;

    for (let i = 0; i < numOfYears; i++) {
      this.years.push({year: currentYear, text: currentYear.toString(), checked: i < 2 ? true : false});
      currentYear--;
    }
  }

  getCurrentYear(): number {
    return new Date().getFullYear();
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
    this.initChartCarRevenuePart();
    this.initYearTotalsData();
    this.initSpecialData();
  }

  initChartRevenueData(): void {
    this.years.forEach(item => {
      if (item.checked) {
        this.addRevenueYear(item.year);
      }
    });
  }

  initChartProfitAndCostsData(): void {
    this.years.forEach(item => {
      if (item.checked) {
        this.addProfitAndCostsYear(item.year);
      }
    });
  }

  initChartCarRevenuePart(): void {
    const carPlates = this.getUniqueCarPlates();
    const carTotals = [];
    
    carPlates.forEach(carPlate => {
      let carRevenueTotal = 0;

      this.years.forEach(yearItem => {
        if (yearItem.checked) {
          carRevenueTotal += this.getCarYearTotal(carPlate, yearItem.year, 'totalPrice');
        }
      });

      carTotals.push([carPlate, carRevenueTotal]);
    });

    console.log(carTotals);
    
    //this.chartCarRevenuePart.unload();
    this.chartCarRevenuePart.load({
      columns: carTotals
    });
  }

  initYearTotalsData(): void {
    this.years.forEach(item => {
      this.yearTotals.push({
        year: item.year, 
        revenueTotal: this.getYearTotal(item.year, 'totalPrice'),
        costsTotal: this.getYearTotal(item.year, 'brokerCosts'),
        profitTotal: this.getYearTotal(item.year, 'profit')
      });
    });

    this.yearTotals.forEach(item => {
      this.revenueTotal += item.revenueTotal;
      this.costsTotal += item.costsTotal;
      this.profitTotal += item.profitTotal;
    });
  }

  initSpecialData() {
    this.numOfPendingAgreements = this.getPendingTotal();
    this.numOfUnpaidAgreements = this.getUnpaidTotal();
    this.avgYearRevenue = this.getAverageYearRevenue();
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


  getYearTotals(year: number, agreementPropertyToSum: string): Array<any> {
    let array = new Array<any>();
    array.push(year.toString());

    for (let month = 1; month <= 12; month++) {
      array.push(this.getMonthTotal(year, month, agreementPropertyToSum));
    }

    return array;
  }

  getMonthTotal(year: number, month: number, agreementPropertyToSum: string): number {

    return this.agreements.reduce((sum, a) => 
      a['year'] === year && a['month'] === month 
      && (this.includeUnpayed || a['payed']) 
      && (this.includePending || a['status'] != 'PENDING')
        ? sum + a[agreementPropertyToSum] 
        : sum + 0, 0
    );
  }

  getYearTotal(year: number, agreementPropertyToSum: string): number {
    return this.agreements.reduce((sum, a) => 
      a['year'] === year 
      && (this.includeUnpayed === true || a['payed'] === true) 
      && (this.includePending || a['status'] != 'PENDING')
        ? sum + a[agreementPropertyToSum] 
        : sum + 0, 0
    );
  }

  getCarYearTotal(numberplate: string, year: number, agreementPropertyToSum: string): number {
    return this.agreements.reduce((sum, a) => 
      a['numberPlate'] === numberplate && a['year'] === year 
      && (this.includeUnpayed === true || a['payed'] === true) 
      && (this.includePending || a['status'] != 'PENDING')
        ? sum + a[agreementPropertyToSum] 
        : sum + 0, 0
    );
  }

  getUniqueCarPlates(): Array<any> {
    const plates = [];

    this.agreements.forEach(a => {
      if (plates.indexOf(a['numberPlate']) === -1) {
        plates.push(a['numberPlate']);
      }
    });
    
    return plates;
  }

  getUnpaidTotal(): number {
    return this.agreements.reduce((sum, a) => 
      a['payed'] === false && a['status'] != 'PENDING' ? sum + 1 : sum + 0, 0
    );
  }

  getPendingTotal(): number {
    return this.agreements.reduce((sum, a) => 
      a['status'] === "PENDING" ? sum + 1 : sum + 0, 0
    );
  }

  getAverageYearRevenue(): number {
    const currentYear = this.getCurrentYear();
    const yearTotals = [];

    this.years.forEach(item => {
      if (item.year != currentYear) {
        const total = this.getYearTotal(item.year, 'totalPrice');
        if (total > 0) {
          yearTotals.push(total);
        }
      }
    });

    const avg = yearTotals.reduce((sum, total) => sum + total, 0) / yearTotals.length;

    return avg;
  }


  clearCharts() {
    this.chartRevenue.unload();
    this.chartProfitAndCosts.unload();
    this.chartCarRevenuePart.unload();
    this.yearTotals = [];
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
          columns: [],
          type : 'pie'
      }
  });
  }

}
