import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { RegisterComponent } from './register.component';

fdescribe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  // function updateForm(firstName:any, lastName:any,email:any,password:any) {
  //   fixture.componentInstance.registrationForm.controls['firstName'].setValue(firstName);
  //   fixture.componentInstance.registrationForm.controls['lastName'].setValue(lastName);
  //   fixture.componentInstance.registrationForm.controls['email'].setValue(email);
  //   fixture.componentInstance.registrationForm.controls['password'].setValue(password);
  // }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports:[ReactiveFormsModule,RouterTestingModule],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('created a form with some field and signup button', () => {
    const fnameContainer = fixture.debugElement.nativeElement.querySelector('#firstname-container');
    const lnameContainer = fixture.debugElement.nativeElement.querySelector('#lastname-container');
    const emailContainer = fixture.debugElement.nativeElement.querySelector('#email-container');
    const passwordContainer = fixture.debugElement.nativeElement.querySelector('#password-container');
    const repeatPasswordContainer = fixture.debugElement.nativeElement.querySelector('#repeatPassword-container');
    const signupBtnContainer = fixture.debugElement.nativeElement.querySelector('#signup-btn-container');

    expect(fnameContainer).toBeDefined();
    expect(lnameContainer).toBeDefined();
    expect(emailContainer).toBeDefined();
    expect(passwordContainer).toBeDefined();
    expect(repeatPasswordContainer).toBeDefined();
    expect(signupBtnContainer).toBeDefined();

  });

  it('component initial state form', () => {
    expect(component.submitted).toBeFalsy();
    expect(component.registrationForm).toBeDefined();
    expect(component.registrationForm.invalid).toBeTruthy();
  });

  it('submitted should be true when onSubmit()', () => {
    component.submitForm();
    expect(component.submitted).toBeTruthy();
  });

});
