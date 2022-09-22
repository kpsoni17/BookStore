import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { OutHomeComponent } from './out-home.component';

fdescribe('OutHomeComponent', () => {
  let component: OutHomeComponent;
  let fixture: ComponentFixture<OutHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutHomeComponent ],
      imports:[RouterTestingModule,ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  function updateForm(userEmail:any, userPassword:any) {
    fixture.componentInstance.loginForm.controls['email'].setValue(userEmail);
    fixture.componentInstance.loginForm.controls['password'].setValue(userPassword);
  }


  it('created a form with username and password input and login button', () => {
    // const fixture = TestBed.createComponent(LoginComponent);
    const usernameContainer = fixture.debugElement.nativeElement.querySelector('#username-container');
    const passwordContainer = fixture.debugElement.nativeElement.querySelector('#password-container');
    const loginBtnContainer = fixture.debugElement.nativeElement.querySelector('#login-btn-container');
    expect(usernameContainer).toBeDefined();
    expect(passwordContainer).toBeDefined();
    expect(loginBtnContainer).toBeDefined();
  });
 

  

  it('component initial state', () => {
    expect(component.submitted).toBeFalsy();
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.invalid).toBeTruthy();
  });


  it('submitted should be true when onSubmit()', () => {
    component.login();
    expect(component.submitted).toBeTruthy();
  });


let blankUser ={
  username:'',
  password:''
}
  it('Display Both Username & Password Error Msg when both field is blank', () => {
    updateForm(blankUser.username, blankUser.password);
    fixture.detectChanges();
​
    const buttonLogin = fixture.debugElement.nativeElement.querySelector('#login-btn-container');
    buttonLogin.click();
    fixture.detectChanges();
​
    const usernameErrorMsg = fixture.debugElement.nativeElement.querySelector('#username-error-msg');
    const passwordErrorMsg = fixture.debugElement.nativeElement.querySelector('#password-error-msg');

    expect(usernameErrorMsg).toBeDefined();
    expect(usernameErrorMsg.innerHTML).toContain('*Email is required');
    console.log(usernameErrorMsg.innerHTML);
    
​
    expect(passwordErrorMsg).toBeDefined();
    expect(passwordErrorMsg.innerHTML).toContain('*Password is required');
    console.log(passwordErrorMsg.innerHTML);

  });

  let validUser ={
    username:'kapil123@gmail.com',
    password:'12345678'
  }

  it('When username is blank, username field should display different color ', () => {
    updateForm(blankUser.username, validUser.password);
    fixture.detectChanges();
    const buttonLogin = fixture.debugElement.nativeElement.querySelector('#login-btn-container');
    buttonLogin.click();
    fixture.detectChanges();
​
    const inputs = fixture.debugElement.nativeElement.querySelectorAll('#username-container');
    const usernameInput = inputs[0];
​
    expect(usernameInput.classList).toContain('isInvalid');
  });


  it('When password is blank, password field should display different color ', () => {
    updateForm(validUser.username, blankUser.password);
    fixture.detectChanges();
    const buttonLogin = fixture.debugElement.nativeElement.querySelector('#login-btn-container');
    buttonLogin.click();
    fixture.detectChanges();
​
    const inputs = fixture.debugElement.nativeElement.querySelectorAll('#password-container');
    const passwordInput = inputs[0];
​
    expect(passwordInput.classList).toContain('isInvalid');
  });



});
