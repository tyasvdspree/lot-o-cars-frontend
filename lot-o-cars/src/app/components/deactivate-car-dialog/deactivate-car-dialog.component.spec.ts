import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivateCarDialogComponent } from './deactivate-car-dialog.component';

describe('DeactivateCarDialogComponent', () => {
  let component: DeactivateCarDialogComponent;
  let fixture: ComponentFixture<DeactivateCarDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeactivateCarDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactivateCarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
