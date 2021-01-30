import { Component, OnDestroy, OnInit } from '@angular/core';
import * as c3 from 'c3';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { isAdminUser } from 'src/app/models/user.model';
import { AgreementService } from 'src/app/services/agreement-service/agreement.service';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  isAdminUser: boolean;
  isAdminDashboard: boolean;
  userName = '';
  years = [];
  startYear: number;
  endYear: number;
  includePending: boolean = true;
  includeUnpayed: boolean = true;
  // Messages
  msgGetUserError = 'Fout bij ophalen gebruikersgegevens.';
  msgGetDataError = 'Fout bij ophalen van gegevens.';
  msgGetAmountDataError = 'Fout bij ophalen van aantallen.';
  msgNoDataInfo = 'U ziet geen data omdat u (nog) geen auto\'s heeft verhuurd.'
  // API labels and translations
  keyProperty = 'key';
  valProperty = 'value';
  keyRentees = 'Rentees';
  keyRenteesTranslation = 'verhuurders';
  keyRenters = 'Renters'; 
  keyRentersTranslation = 'huurders';
  keyAvgCancellations = 'avg cancellations per year'
  keyAvgCancellationsTranslation = 'annuleringen (gemiddeld per jaar)';
  keyAvgAgreements = 'avg agreements per year';
  keyAvgAgreementsTranslation = 'huurovereenkomsten (gemiddeld per jaar)';
  keyAvgInvolvedCars = 'avg involved cars per year';
  keyAvgInvolvedCarsTranslation = 'auto\'s (gemiddeld per jaar)';
  // Labels
  labelProfit = 'winst';
  labelCosts = 'kosten';
  // Status values
  statusPending = 'PENDING';
  // Properties of data items
  propYear = 'year';
  propMonth = 'month';
  propNumberPlate = 'numberPlate';
  propIsPayed = 'payed';
  propStatus = 'status';
  propTotalPriceOrRevenue = 'total';
  propBrokerCosts = 'brokerCosts';
  propProfit = 'profit';

  data: [];
  keyValuePairs: [];

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

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.forEach(x => x.unsubscribe());
    }
  }

  switchDashboardView(event: any) {
    this.isAdminDashboard = event.value;
    this.clearCharts();
    this.showCharts();
    this.getDashboardDataFromApi();
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
    this.subscriptions.push(
      this.userService.getUser().subscribe(
        user => {
          console.log(user);
          this.userName = user.username;
          this.isAdminDashboard = isAdminUser(user);
          this.isAdminUser = this.isAdminDashboard;
          this.getDashboardDataFromApi();
        },
        error => {
          this.toastrService.error(this.msgGetUserError);
        }
      )
    );
  }

  getDashboardDataFromApi(): void {
    if (this.isAdminDashboard) {
      this.getBrokerFeeTotalsFromApi();
      this.getGeneralCountsFromApi();
    } else {
      this.getAgreementDataFromApi();
    }
  }

  getAgreementDataFromApi(): void {
    this.subscriptions.push(
      this.agreementService.getDashboardAgreements(this.userName, this.startYear, this.endYear).subscribe(
        data => {
          this.data = data;
          this.initChartData();

          if (!this.data || this.data.length === 0) {
            this.toastrService.info(this.msgNoDataInfo);
          }
        },
        error => {
          this.toastrService.error(this.msgGetDataError);
        }
      )
    );
  }

  getBrokerFeeTotalsFromApi(): void {
    this.subscriptions.push(
      this.agreementService.getDashboardBrokerFeeTotals(this.startYear, this.endYear).subscribe(
        data => {
          this.data = data;
          this.initChartData();
        },
        error => {
          this.toastrService.error(this.msgGetDataError);
        }
      )
    );
  }

  getGeneralCountsFromApi(): void {
    this.subscriptions.push(
      this.agreementService.getGeneralCounts().subscribe(
        data => {
          this.keyValuePairs = data.map(pair => {
            return { 
              key: pair[this.keyProperty]
                .replace(this.keyRentees, this.keyRenteesTranslation)
                .replace(this.keyRenters, this.keyRentersTranslation)
                .replace(this.keyAvgCancellations, this.keyAvgCancellationsTranslation)
                .replace(this.keyAvgAgreements, this.keyAvgAgreementsTranslation)
                .replace(this.keyAvgInvolvedCars, this.keyAvgInvolvedCarsTranslation), 
              value: pair[this.valProperty] 
            }
          });
        },
        error => {
          this.toastrService.error(this.msgGetAmountDataError);
        }
      )
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
          carRevenueTotal += this.getCarYearTotal(carPlate, yearItem.year, this.propTotalPriceOrRevenue);
        }
      });

      carTotals.push([carPlate, carRevenueTotal]);
    });
    
    this.chartCarRevenuePart.load({
      columns: carTotals
    });
  }

  initYearTotalsData(): void {
    this.years.forEach(item => {
      this.yearTotals.push({
        year: item.year, 
        revenueTotal: this.getYearTotal(item.year, this.propTotalPriceOrRevenue),
        costsTotal: this.getYearTotal(item.year, this.propBrokerCosts),
        profitTotal: this.getYearTotal(item.year, this.propProfit)
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
    const yearTotals = this.getYearTotals(year, this.propTotalPriceOrRevenue);
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
    const profitTotals = this.getYearTotals(year, this.propProfit);
    // change label
    profitTotals[0] = `${this.labelProfit} ${profitTotals[0]}`;

    const costTotals = this.getYearTotals(year, this.propBrokerCosts);
    // change label
    costTotals[0] = `${this.labelCosts} ${costTotals[0]}`;

    this.chartProfitAndCosts.load({
        columns: [profitTotals, costTotals]
    });
  }

  removeProfitAndCostsYear(year: number) {
    this.chartProfitAndCosts.unload({
      ids: [`${this.labelProfit} ${year}`, `${this.labelCosts} ${year}`]
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
      dataItem[this.propYear] === year && dataItem[this.propMonth] === month 
      && (this.includeUnpayed || dataItem[this.propIsPayed]) 
      && (this.includePending || dataItem[this.propStatus] != this.statusPending)
        ? sum + dataItem[dataPropertyToSum] 
        : sum + 0,
        initialValue
    );
  }

  getYearTotal(year: number, dataPropertyToSum: string): number {
    let initialValue = 0;
    return this.data.reduce((sum, dataItem) => 
      dataItem[this.propYear] === year 
      && (this.includeUnpayed === true || dataItem[this.propIsPayed] === true) 
      && (this.includePending || dataItem[this.propStatus] != this.statusPending)
        ? sum + dataItem[dataPropertyToSum] 
        : sum + 0,
        initialValue
    );
  }

  getCarYearTotal(numberplate: string, year: number, dataPropertyToSum: string): number {
    let initialValue = 0;
    return this.data.reduce((sum, dataItem) => 
      dataItem[this.propNumberPlate] === numberplate && dataItem[this.propYear] === year 
      && (this.includeUnpayed === true || dataItem[this.propIsPayed] === true) 
      && (this.includePending || dataItem[this.propStatus] != this.statusPending)
        ? sum + dataItem[dataPropertyToSum] 
        : sum + 0,
        initialValue
    );
  }

  getUniqueCarPlates(): Array<any> {
    const plates = [];

    this.data.forEach(dataItem => {
      if (plates.indexOf(dataItem[this.propNumberPlate]) === -1) {
        plates.push(dataItem[this.propNumberPlate]);
      }
    });
    
    return plates;
  }

  getUnpaidTotal(): number {
    let initialValue = 0;
    return this.data.reduce((sum, dataItem) => 
      dataItem[this.propIsPayed] === false && dataItem[this.propStatus] != this.statusPending 
      ? sum + 1 
      : sum + 0, 
      initialValue
    );
  }

  getPendingTotal(): number {
    let initialValue = 0;
    return this.data.reduce((sum, dataItem) => 
      dataItem[this.propStatus] === this.statusPending 
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
        const total = this.getYearTotal(item.year, this.propTotalPriceOrRevenue);
        if (total > 0) {
          yearTotals.push(total);
        }
      }
    });

    const avg = yearTotals.reduce((sum, total) => sum + total, 0) / yearTotals.length;

    return avg || 0;
  }


  clearCharts() {
    this.chartRevenue.unload();
    if (!this.isAdminDashboard) {
      this.chartProfitAndCosts.unload();
      this.chartCarRevenuePart.unload();
    }
    this.yearTotals = [];
    this.keyValuePairs = [];
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
