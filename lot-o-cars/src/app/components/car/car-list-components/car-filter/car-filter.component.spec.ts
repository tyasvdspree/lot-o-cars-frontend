import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarFilterComponent } from './car-filter.component';

describe('CarFilterComponent', () => {
  let component: CarFilterComponent;
  let fixture: ComponentFixture<CarFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a default pickupData in search criteria for date of tomorrow', () => {
    const criteria = component.searchCriteria;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    expect(criteria.pickUpDate.getFullYear()).toEqual(tomorrow.getFullYear());
    expect(criteria.pickUpDate.getMonth()).toEqual(tomorrow.getMonth());
    expect(criteria.pickUpDate.getDay()).toEqual(tomorrow.getDay());
  });

  it('should have a default dropoffData in search criteria for date of day after tomorrow', () => {
    const criteria = component.searchCriteria;
    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
    expect(criteria.dropOffDate.getFullYear()).toEqual(dayAfterTomorrow.getFullYear());
    expect(criteria.dropOffDate.getMonth()).toEqual(dayAfterTomorrow.getMonth());
    expect(criteria.dropOffDate.getDay()).toEqual(dayAfterTomorrow.getDay());
  });

  it('should have no other defaults besides the pickup and dropoff dates', () => {
    const criteria = component.searchCriteria;
    expect(criteria.pickUpLocation).toBeFalsy;
    expect(criteria.make).toBeFalsy;
    expect(criteria.model).toBeFalsy;
    expect(criteria.color).toBeFalsy;
    expect(criteria.transmission).toBeFalsy;
    expect(criteria.fuel).toBeFalsy;
    expect(criteria.modelYear).toBeFalsy;
    expect(criteria.doors).toBeFalsy;
    expect(criteria.seats).toBeFalsy;
    expect(criteria.bootspaceInLiters).toBeFalsy;
    expect(criteria.nonSmoking).toBeFalsy;
  });

});
