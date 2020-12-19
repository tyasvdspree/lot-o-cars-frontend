import {Component, Input, OnInit} from '@angular/core';
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
export class AgreementComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()  });
  agreement: Agreement = new Agreement();
  numberOfDays = null;
  carServiceSubscription: Subscription;
  licensePlate: string;
  carId: number;
  car: Car;

  constructor(
    private carService: CarService,
    private agreementService: AgreementService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
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
    });
  }


  get daysBetween(): number {
    const StartDate = this.range.value.start;
    const EndDate = this.range.value.end;
    if (StartDate === null || EndDate === null) {
      return null;
    }
    // The number of milliseconds in all UTC days (no DST)
    const oneDay = 1000 * 60 * 60 * 24;

    // A day in UTC always lasts 24 hours (unlike in other time formats)
    const start = Date.UTC(EndDate.getFullYear(), EndDate.getMonth(), EndDate.getDate());
    const end = Date.UTC(StartDate.getFullYear(), StartDate.getMonth(), StartDate.getDate());


    // so it's safe to divide by 24 hours
    const numberOfDays = ((start - end) / oneDay) + 1;
    this.numberOfDays = numberOfDays;
    return numberOfDays;
  }

  get totalPrice() {
    return this.numberOfDays * this.car.rentPricePerHour;
  }

  createAgreement() {
    if (this.range.value.start == null){
      this.toastr.error('Geen periode geselecteerd');
    } else {
      this.agreement.carId = this.car.id;
      this.agreement.car = this.car;
      this.agreement.renterId = 1;
      // this.agreement.renteeId = 1; ben je zelf, backend?
      this.agreement.startDate = this.range.value.start;
      this.agreement.endDate = this.range.value.end;
      this.agreementService.createAgreement(this.agreement).subscribe(
        response => {
          console.log(response)
          this.toastr.success('Overeenkomst gemaakt');  // todo: alleen bij goede response
          // this.router.navigateByUrl(`/`);
        }
      )
    }
  }
}
