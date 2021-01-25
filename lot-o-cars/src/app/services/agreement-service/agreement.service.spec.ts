import {inject, TestBed} from '@angular/core/testing';

import { AgreementService } from './agreement.service';
import {of} from 'rxjs';
import {Bank} from '../../enums/bank.enum';

describe('AgreementService', () => {
  let service: AgreementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgreementService]
    });
    service = TestBed.inject(AgreementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have getBanks function', inject([AgreementService], (service: AgreementService) => {
    expect(service.getBanks).toBeTruthy();
  }));

  it('should have createAgreement function', inject([AgreementService], (service: AgreementService) => {
    expect(service.createAgreement).toBeTruthy();
  }));

  it('should have getAgreements function', inject([AgreementService], (service: AgreementService) => {
    expect(service.getAgreements).toBeTruthy();
  }));

  it('should have getAgreementById function', inject([AgreementService], (service: AgreementService) => {
    expect(service.getAgreementById).toBeTruthy();
  }));

  it('should have setAgreementStatus function', inject([AgreementService], (service: AgreementService) => {
    expect(service.setAgreementStatus).toBeTruthy();
  }));

  it('should have getDashboardAgreements function', inject([AgreementService], (service: AgreementService) => {
    expect(service.getDashboardAgreements).toBeTruthy();
  }));

  it('should have getDashboardBrokerFeeTotals function', inject([AgreementService], (service: AgreementService) => {
    expect(service.getDashboardBrokerFeeTotals).toBeTruthy();
  }));

  it('should have getGeneralCounts function', inject([AgreementService], (service: AgreementService) => {
    expect(service.getGeneralCounts).toBeTruthy();
  }));

  it('should have setAgreementPayment function', inject([AgreementService], (service: AgreementService) => {
    expect(service.setAgreementPayment).toBeTruthy();
  }));

});
