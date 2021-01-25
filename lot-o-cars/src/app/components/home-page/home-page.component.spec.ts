import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePageComponent } from './home-page.component';
import { By } from '@angular/platform-browser';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an h1 element with text: lot-o-cars', () => {
    const elem = fixture.debugElement.query(By.css('h1'));
    expect(elem.nativeElement.textContent).toBe('lot-o-cars');
  });

  it('should have an h2 element with text: autoverhuur', () => {
    const elem = fixture.debugElement.query(By.css('h2'));
    expect(elem.nativeElement.textContent).toBe('autoverhuur');
  });

  it('should have a p element with text: waar huurders en verhuurders van particuliere auto\'s elkaar vinden', () => {
    const elem = fixture.debugElement.query(By.css('p'));
    expect(elem.nativeElement.textContent).toBe('waar huurders en verhuurders van particuliere auto\'s elkaar vinden');
  });

  it('should have an img element with src: /assets/img/app/maincar.jpg', () => {
    const elem = fixture.debugElement.query(By.css('img'));
    expect(elem.nativeElement['src']).toContain('/assets/img/app/maincar.jpg');
  });
});
