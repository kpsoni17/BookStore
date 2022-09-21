
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HeaderComponent } from './header.component';

fdescribe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports:[HttpClientTestingModule],
      providers:[{
        provide: Router, useValue: routerSpy
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should navigate to the register page', () => {      
    component.navigateToRegister();
    const navArgs = routerSpy.navigateByUrl.calls.first().args[0];
    expect(navArgs).toEqual("/register");
  });

  // it('should navigate to the productsManagment page', () => {      
  //   component.navigateToProducts();
  //   const navArgs = routerSpy.navigateByUrl.calls.first().args[0];
  //   expect(navArgs).toEqual("/productsManagment");
  // });




});

