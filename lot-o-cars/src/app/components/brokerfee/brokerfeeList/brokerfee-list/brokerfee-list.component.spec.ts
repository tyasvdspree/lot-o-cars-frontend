import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerfeeListComponent } from './brokerfee-list.component';

describe('BrokerfeeListComponent', () => {
  let component: BrokerfeeListComponent;
  let fixture: ComponentFixture<BrokerfeeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrokerfeeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerfeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
