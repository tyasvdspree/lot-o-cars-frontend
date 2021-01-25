import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarListComponent } from './car-list.component';

describe('CarListComponent', () => {
  let component: CarListComponent;
  let fixture: ComponentFixture<CarListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should give a fixed image url when no valid carImageId is presented', () => {
    const numberPlate = 'AA-01-BB';
    const carImageId = 0;
    const url = component.getImageUrl(numberPlate, carImageId);
    expect(url).toBe('assets/img/app/maincar.jpg');
  });
});
