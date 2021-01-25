import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Car } from 'src/app/models/car.model';
import { Location } from 'src/app/models/location.model';
import { User } from 'src/app/models/user.model';
import { CardetailsComponent } from './car-details.component';

describe('CardetailsComponent', () => {
  let component: CardetailsComponent;
  let fixture: ComponentFixture<CardetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 1 anchor element before a car was loaded', () => {
    const elems = fixture.debugElement.queryAll(By.css('a'));
    expect(elems.length).toBe(1);
  });

  it('should have 2 anchor elements after a car was loaded', () => {
    const dummyCar = new Car();
    dummyCar.location = new Location();
    dummyCar.user = new User('', '', '', '', '','');
    component.car = dummyCar;
    fixture.detectChanges();
    const elems = fixture.debugElement.queryAll(By.css('a'));
    expect(elems.length).toBe(2);
  });

  it('should have 5 mat-card elements', () => {
    const elems = fixture.debugElement.queryAll(By.css('mat-card'));
    expect(elems.length).toBe(5);
  });

  it('should have a first mat-card element with title foto\'s', () => {
    const elems = fixture.debugElement.queryAll(By.css('mat-card-title'));
    expect(elems[0].nativeElement.textContent.trim()).toBe('foto\'s');
  });

  it('should have a second mat-card element with title auto', () => {
    const elems = fixture.debugElement.queryAll(By.css('mat-card-title'));
    expect(elems[1].nativeElement.textContent.trim()).toBe('auto');
  });

  it('should have a third mat-card element with title ophaaladres', () => {
    const elems = fixture.debugElement.queryAll(By.css('mat-card-title'));
    expect(elems[2].nativeElement.textContent.trim()).toBe('ophaaladres');
  });

  it('should have a fourth mat-card element with title verhuurder', () => {
    const elems = fixture.debugElement.queryAll(By.css('mat-card-title'));
    expect(elems[3].nativeElement.textContent.trim()).toBe('verhuurder');
  });

  it('should have a fifth mat-card element with title beschikbaarheid', () => {
    const elems = fixture.debugElement.queryAll(By.css('mat-card-title'));
    expect(elems[4].nativeElement.textContent.trim()).toBe('beschikbaarheid');
  });

});
