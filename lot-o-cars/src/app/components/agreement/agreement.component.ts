import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Agreement} from '../../models/agreement.model';
import {CarService} from '../../services/car.service';
import {Car} from '../../models/car.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AgreementService} from '../../services/agreement.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.scss']
})
export class AgreementComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  agreement: Agreement = new Agreement();
  numberOfDays = null;
  carServiceSubscription: Subscription;
  licensePlate: string;
  car: Car;
  blockedDates: Date[];
  startDate: Date = null;
  endDate: Date = null;

  constructor(
    private carService: CarService,
    private agreementService: AgreementService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.params.subscribe(parameters => {
        this.licensePlate = parameters.id;
        this.carServiceSubscription = this.carService.findByNumberPlate(this.licensePlate).subscribe(
          response => {
            this.car = response;
          },
          error => {
            console.log(error);
          }
        );
      }));
    this.subscriptions.push(
      this.carService.getBlockedDates(this.licensePlate).subscribe(
        response => {
          if (response) {
            this.blockedDates = response.map(x => new Date(x + ' 00:00:00'));
          }
        },
        error => {
          console.log(error);
        }
      ));
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.forEach(x => x.unsubscribe());
    }
  }

  get daysBetween(): number {
    if (!this.startDate || !this.endDate) {
      return;
    }
    // The number of milliseconds in all UTC days (no DST)
    const oneDay = 1000 * 60 * 60 * 24;
    // A day in UTC always lasts 24 hours (unlike in other time formats)
    const end = Date.UTC(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());
    const start = Date.UTC(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate());
    // so it's safe to divide by 24 hours
    const numberOfDays = ((end - start) / oneDay) + 1;
    this.numberOfDays = numberOfDays;
    return numberOfDays;
  }

  get totalPrice(): number {
    return this.numberOfDays * this.car.rentPricePerHour;
  }

  createAgreement(): void {
    if (!this.startDate || !this.endDate){
      this.toastr.error('Geen periode geselecteerd');
      return;
    }
    const today = new Date();
    today.setDate(today.getDate() - 1);
    if (this.startDate < today) {
      this.toastr.error('Ongeldige start datum');
      return;
    }
    this.agreement.car = this.car;
    this.agreement.startDate = this.startDate;
    this.agreement.endDate = this.endDate;
    this.agreementService.createAgreement(this.agreement).subscribe(
      response => {
        this.toastr.success('Overeenkomst gemaakt');
        this.router.navigateByUrl(`/hirehistory`); // TODO: navigate to agreement detail
      }
    );
  }

  onStartDateChanged(startDate): void {
    this.startDate = new Date(startDate.value);
  }

  onEndDateChanged(endDate): void {
    this.endDate = new Date(endDate.value);
  }
}
