import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerfeeRequestComponent } from './brokerfee-request.component';

describe('BrokerfeeRequestComponent', () => {
  let component: BrokerfeeRequestComponent;
  let fixture: ComponentFixture<BrokerfeeRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrokerfeeRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerfeeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
