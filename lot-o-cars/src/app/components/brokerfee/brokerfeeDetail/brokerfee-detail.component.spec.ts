import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerfeeDetailComponent } from './brokerfee-detail.component';

describe('BrokerfeeDetailComponent', () => {
  let component: BrokerfeeDetailComponent;
  let fixture: ComponentFixture<BrokerfeeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrokerfeeDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerfeeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
