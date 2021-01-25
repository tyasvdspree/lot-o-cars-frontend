import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FootermenuComponent } from './footer-menu.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { Location } from '@angular/common';

describe('FootermenuComponent', () => {
  let component: FootermenuComponent;
  let fixture: ComponentFixture<FootermenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        FootermenuComponent 
      ],
      imports: [
        RouterTestingModule.withRoutes(
          [
            { path: 'contact', component: DummyComponent },
            { path: 'terms', component: DummyComponent }
          ]
        )
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FootermenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an span element with text: 2021 (c) lot-o-cars', () => {
    const elem = fixture.debugElement.query(By.css('span'));
    expect(elem.nativeElement.textContent.trim()).toBe('2021 © lot-o-cars');
  });

  it('should have two anchor elements', () => {
    const elems = fixture.debugElement.queryAll(By.css('a'));
    expect(elems.length).toBe(2);
  });

  it('should have an anchor element with text: contact', () => {
    const elems = fixture.debugElement.queryAll(By.css('a'));
    expect(elems[0].nativeElement.textContent.trim()).toBe('contact');
  });

  it('should have an anchor element with text: voorwaarden', () => {
    const elems = fixture.debugElement.queryAll(By.css('a'));
    expect(elems[1].nativeElement.textContent.trim()).toBe('voorwaarden');
  });

  it('should navigate to /contact on anchor contact click', () => {
    const location = TestBed.inject(Location);
    const links = fixture.debugElement.queryAll(By.css('a'));
    const contactAnchor = links[0].nativeElement;
    contactAnchor.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/contact');
    });
  });

  it('should navigate to /terms on anchor voorwaarden click', () => {
    const location = TestBed.inject(Location);
    const links = fixture.debugElement.queryAll(By.css('a'));
    const termsAnchor = links[1].nativeElement;
    termsAnchor.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/terms');
    });
  });
});

@Component({template: ''})
class DummyComponent {}
