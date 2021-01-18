import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCarButonComponent } from './edit-car-buton.component';

describe('EditCarButonComponent', () => {
  let component: EditCarButonComponent;
  let fixture: ComponentFixture<EditCarButonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCarButonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCarButonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
