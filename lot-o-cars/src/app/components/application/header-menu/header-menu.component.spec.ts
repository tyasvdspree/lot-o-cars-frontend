import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadermenuComponent } from './header-menu.component';

describe('HeadermenuComponent', () => {
  let component: HeadermenuComponent;
  let fixture: ComponentFixture<HeadermenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadermenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadermenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
