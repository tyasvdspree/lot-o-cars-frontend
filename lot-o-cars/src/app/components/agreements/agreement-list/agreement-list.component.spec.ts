import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementlistComponent } from './agreement-list.component';
import {Agreement} from '../../../models/agreement.model';

describe('AgreementlistComponent', () => {
  let component: AgreementlistComponent;
  let fixture: ComponentFixture<AgreementlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgreementlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compare agreements by start dates', () => {
    const agreement = new Agreement();
    const agreement2 = new Agreement();
    const date = new Date();
    agreement.startDate = date;
    agreement2.startDate = date;
    expect(component.compareAgreementsByStartDateDesc(agreement, agreement2)).toEqual(0);
  });

  it('should compare agreements by start dates and find difference', () => {
    const agreement = new Agreement();
    const agreement2 = new Agreement();
    const date = new Date();
    const date2 = new Date();
    date2.setDate(1);
    agreement.startDate = date;
    agreement2.startDate = date2;
    expect(component.compareAgreementsByStartDateDesc(agreement, agreement2)).toEqual(-1 || 1);
  });
});
