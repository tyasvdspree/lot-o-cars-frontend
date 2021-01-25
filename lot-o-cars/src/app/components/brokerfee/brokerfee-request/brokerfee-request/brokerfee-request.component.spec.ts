import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { BrokerfeeRequest } from 'src/app/models/brokerfee.model';
import { User } from 'src/app/models/user.model';

import { BrokerfeeRequestComponent } from './brokerfee-request.component';

describe('BrokerfeeRequestComponent', () => {
  let component: BrokerfeeRequestComponent;
  let fixture: ComponentFixture<BrokerfeeRequestComponent>;
  let user: User;
  let brokerFeeRequest: BrokerfeeRequest;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrokerfeeRequestComponent ],
      providers: [
        { provide: BrokerfeeServiceStub, useClass: BrokerfeeServiceStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerfeeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    user =  new User('user1', 'user1', 'John', 'Doe', '06-12345678', 'john@doe.com');
    brokerFeeRequest = new BrokerfeeRequest();
    brokerFeeRequest.id = 1;
    brokerFeeRequest.user = user;
    component.brokerfeeRequest = brokerFeeRequest;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});

class BrokerfeeServiceStub {
  createBrokerFeeRequest(brokerfeeRequest: BrokerfeeRequest): Observable<any> {
    return of(BrokerfeeRequest);
  }

  getBrokerFeeRequests(isAdmin: boolean): Observable<any> {
    return of(BrokerfeeRequest);
  }

  getBrokerFeeRequestById(id: number): Observable<any> {
    return of(BrokerfeeRequest);
  }

  setBrokerFeeRequestStatus(id: number, status: string, reason: string): Observable<any> {
    return of(BrokerfeeRequest);
  }
}
