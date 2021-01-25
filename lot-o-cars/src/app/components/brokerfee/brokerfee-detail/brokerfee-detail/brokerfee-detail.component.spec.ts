import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrokerfeeRequest } from 'src/app/models/brokerfee.model';
import { User } from 'src/app/models/user.model';

import { BrokerfeeDetailComponent } from './brokerfee-detail.component';

describe('BrokerfeeDetailComponent', () => {
  let component: BrokerfeeDetailComponent;
  let fixture: ComponentFixture<BrokerfeeDetailComponent>;
  let user: User;
  let brokerFeeRequest: BrokerfeeRequest;


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
    user =  new User('user1', 'user1', 'John', 'Doe', '06-12345678', 'john@doe.com');
    component.user = user;
    brokerFeeRequest = new BrokerfeeRequest();
    brokerFeeRequest.id = 1;
    brokerFeeRequest.user = user;
    component.brokerfeeRequest = brokerFeeRequest;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
