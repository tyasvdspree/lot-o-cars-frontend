import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HirehistoryComponent } from './hire-history.component';

describe('HirehistoryComponent', () => {
  let component: HirehistoryComponent;
  let fixture: ComponentFixture<HirehistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HirehistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HirehistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
