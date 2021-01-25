import {ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { AgreementComponent } from './agreement.component';
import {AgreementService} from '../../../services/agreement-service/agreement.service';
import {Car} from '../../../models/car.model';

describe('AgreementComponent', () => {
  let component: AgreementComponent;
  let fixture: ComponentFixture<AgreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgreementComponent ],
      providers: [AgreementService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate the amount of days between two dates', () => {
    const todayMinus3 = new Date();
    todayMinus3.setDate(todayMinus3.getDate() - 4);
    component.startDate = todayMinus3;
    const today = new Date();
    today.setDate(today.getDate() - 1);
    component.endDate = today;
    expect(component.daysBetween).toEqual(4);
  });

  it('should calculate the total price for a date range', () => {
    component.numberOfDays = 5;
    const car = new Car();
    car.rentPricePerHour = 50;
    component.car = car;
    expect(component.totalPrice).toEqual(250);
  });
});
