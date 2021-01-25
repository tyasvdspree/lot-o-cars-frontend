import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenthistoryComponent } from './rent-history.component';

describe('RenthistoryComponent', () => {
  let component: RenthistoryComponent;
  let fixture: ComponentFixture<RenthistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenthistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenthistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
