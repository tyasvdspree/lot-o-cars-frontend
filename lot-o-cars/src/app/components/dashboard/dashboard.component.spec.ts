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
});
