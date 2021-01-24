import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementlistComponent } from './agreement-list.component';

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
});
