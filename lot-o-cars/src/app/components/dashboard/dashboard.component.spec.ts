import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an h1 with text Dashboard', () => {
    const h1Elem = fixture.debugElement.query(By.css('h1'));
    expect(h1Elem.nativeElement.textContent).toBe('Dashboard');
  });

  it('should have a filter with 10 years', () => {
    const yearFilterElem = fixture.debugElement.query(By.css('ul'));
    expect(yearFilterElem.nativeElement.children.length).toBe(10);
  });

  it('should have a first year filter option with the current year', () => {
    const currentYear = new Date().getFullYear();
    const yearFilterElem = fixture.debugElement.query(By.css('ul'));
    expect(yearFilterElem.nativeElement.children[0].textContent.trim()).toBe(currentYear.toString());
  });

  it('should have a last year filter option of 10 years ago', () => {
    const year = new Date().getFullYear() - 9;
    const yearFilterElem = fixture.debugElement.query(By.css('ul'));
    expect(yearFilterElem.nativeElement.children[9].textContent.trim()).toBe(year.toString());
  });

  it('should have the first and second year filter option checked by default', () => {
    expect(component.years[0].checked).toBe(true);
    expect(component.years[1].checked).toBe(true);
  });

  it('should have the other year filter options unchecked by default', () => {
    expect(component.years[2].checked).toBe(false);
    expect(component.years[3].checked).toBe(false);
    expect(component.years[4].checked).toBe(false);
    expect(component.years[5].checked).toBe(false);
    expect(component.years[6].checked).toBe(false);
    expect(component.years[7].checked).toBe(false);
    expect(component.years[8].checked).toBe(false);
    expect(component.years[9].checked).toBe(false);
  });

});
