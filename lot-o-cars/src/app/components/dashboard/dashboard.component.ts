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

  isAdminDashboard: boolean = true;
  userName = '';
  years = [];
  startYear: number;
  endYear: number;
  includePending: boolean = true;
  includeUnpayed: boolean = true;

  data: [];

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
    this.getCurrentUserIdAndLoadData();
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

  getCurrentUserIdAndLoadData(): void {
    this.userService.getUser().subscribe(
      user => {
        this.userName = user.username;

        if (this.isAdminDashboard) {
          this.getBrokerFeeTotalsFromApi();
        } else {
          this.getAgreementDataFromApi();
        }
      },
      error => {
        this.toastrService.error('Fout bij ophalen gebruikersgegevens.');
      }
    );
  }

  getAgreementDataFromApi(): void {
    this.agreementService.getDashboardAgreements(this.userName, this.startYear, this.endYear).subscribe(
      data => {
        this.data = data;
        console.log('dashboard data: ', data);
        this.initChartData();
      },
      error => {
        this.toastrService.error('Fout bij ophalen van gegevens.');
      }
    );
  }

  getBrokerFeeTotalsFromApi(): void {
    this.agreementService.getDashboardBrokerFeeTotals(this.startYear, this.endYear).subscribe(
      data => {
        this.data = data;
        console.log('brokerfee totals: ', data);
        this.initChartData();
      },
      error => {
        this.toastrService.error('Fout bij ophalen van gegevens.');
      }
    );
  }

  initChartData(): void {
    this.initChartRevenueData();
    if (!this.isAdminDashboard) {
      this.initChartProfitAndCostsData();
      this.initChartCarRevenuePart();
    }
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
          carRevenueTotal += this.getCarYearTotal(carPlate, yearItem.year, 'total');
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
        revenueTotal: this.getYearTotal(item.year, 'total'),
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
    const prop = 'total';
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



  getYearTotals(year: number, dataPropertyToSum: string): Array<any> {
    let array = new Array<any>();
    array.push(year.toString());

    for (let month = 1; month <= 12; month++) {
      array.push(this.getMonthTotal(year, month, dataPropertyToSum));
    }

    return array;
  }

  getMonthTotal(year: number, month: number, dataPropertyToSum: string): number {
    let initialValue = 0;
    return this.data.reduce((sum, dataItem) => 
      dataItem['year'] === year && dataItem['month'] === month 
      && (this.includeUnpayed || dataItem['payed']) 
      && (this.includePending || dataItem['status'] != 'PENDING')
        ? sum + dataItem[dataPropertyToSum] 
        : sum + 0,
        initialValue
    );
  }

  getYearTotal(year: number, dataPropertyToSum: string): number {
    let initialValue = 0;
    return this.data.reduce((sum, dataItem) => 
      dataItem['year'] === year 
      && (this.includeUnpayed === true || dataItem['payed'] === true) 
      && (this.includePending || dataItem['status'] != 'PENDING')
        ? sum + dataItem[dataPropertyToSum] 
        : sum + 0,
        initialValue
    );
  }

  getCarYearTotal(numberplate: string, year: number, dataPropertyToSum: string): number {
    let initialValue = 0;
    return this.data.reduce((sum, dataItem) => 
      dataItem['numberPlate'] === numberplate && dataItem['year'] === year 
      && (this.includeUnpayed === true || dataItem['payed'] === true) 
      && (this.includePending || dataItem['status'] != 'PENDING')
        ? sum + dataItem[dataPropertyToSum] 
        : sum + 0,
        initialValue
    );
  }

  getUniqueCarPlates(): Array<any> {
    const plates = [];

    this.data.forEach(dataItem => {
      if (plates.indexOf(dataItem['numberPlate']) === -1) {
        plates.push(dataItem['numberPlate']);
      }
    });
    
    return plates;
  }

  getUnpaidTotal(): number {
    let initialValue = 0;
    return this.data.reduce((sum, dataItem) => 
      dataItem['payed'] === false && dataItem['status'] != 'PENDING' 
      ? sum + 1 
      : sum + 0, 
      initialValue
    );
  }

  getPendingTotal(): number {
    let initialValue = 0;
    return this.data.reduce((sum, dataItem) => 
      dataItem['status'] === "PENDING" 
      ? sum + 1 
      : sum + 0, 
      initialValue
    );
  }

  getAverageYearRevenue(): number {
    const currentYear = this.getCurrentYear();
    const yearTotals = [];

    this.years.forEach(item => {
      if (item.year != currentYear) {
        const total = this.getYearTotal(item.year, 'total');
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
    if (!this.isAdminDashboard) {
      this.chartProfitAndCosts.unload();
      this.chartCarRevenuePart.unload();
    }
    this.yearTotals = [];
    this.revenueTotal = 0;
    this.costsTotal = 0;
    this.profitTotal = 0;
  }

  showCharts() {
    this.showChartRevenue();

    if (!this.isAdminDashboard) {
      this.showChartProfitAndCosts();
      this.showChartCarRevenuePart();
    }
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
