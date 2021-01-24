import { ComponentFixture, TestBed } from '@angular/core/testing';
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
    expect(component).toBeTruthy();
  });
});

class BrokerfeeServiceStub {

}
