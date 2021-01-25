import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Car } from 'src/app/models/car.model';
import { EditCarComponent } from './edit-car.component';

describe('EditCarComponent', () => {
  let component: EditCarComponent;
  let fixture: ComponentFixture<EditCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have one h1 element', () => {
    const elems = fixture.debugElement.queryAll(By.css('h1'));
    expect(elems.length).toBe(1);
  });  

  it('should navigate to /contact on anchor contact click', () => {
    const car = new Car();
    car.make = 'Ford';
    car.numberPlate = 'H-735-GT';
    const carDescription = `${car.make} - ${car.numberPlate}`;
    component.car = car;
    component.setCarDescription(car);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.carDescription).toBe(carDescription);
    });
  });
});
