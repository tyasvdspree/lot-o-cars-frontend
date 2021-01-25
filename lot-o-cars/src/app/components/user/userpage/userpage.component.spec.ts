import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { User } from 'src/app/models/user.model';
import { UserpageComponent } from './userpage.component';

describe('UserpageComponent', () => {
  let component: UserpageComponent;
  let fixture: ComponentFixture<UserpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an h1 element with text: Mijn gegevens', () => {
    const elem = fixture.debugElement.query(By.css('h1'));
    expect(elem.nativeElement.textContent.trim()).toBe('Mijn gegevens');
  });

  it('should have no anchor element when no user is present', () => {
    const elems = fixture.debugElement.queryAll(By.css('a'));
    expect(elems.length).toBe(0);
  });

  it('should have no button element when no user is present', () => {
    const elems = fixture.debugElement.queryAll(By.css('button'));
    expect(elems.length).toBe(0);
  });

  it('should have 1 anchor element when a user is present', () => {
    component.user = new User('', '', '', '', '', '');
    fixture.detectChanges();
    const elems = fixture.debugElement.queryAll(By.css('a'));
    expect(elems.length).toBe(1);
    expect(elems[0].nativeElement.textContent.trim()).toBe('mijn tarief');
  });

  it('should have 1 button element when a user is present', () => {
    component.user = new User('', '', '', '', '', '');
    fixture.detectChanges();
    const elems = fixture.debugElement.queryAll(By.css('button'));
    expect(elems.length).toBe(1);
    expect(elems[0].nativeElement.textContent.trim()).toBe('wijzig');
  });

});
