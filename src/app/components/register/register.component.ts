import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    })
  }
  allUsers: any = [];
  ngOnInit(): void {

    this.allUsers = [];
    if (localStorage.getItem('USERS') != null) {
      this.allUsers = JSON.parse(localStorage.getItem('USERS')!);
    }
  }
  submitted: boolean = false;
  submitForm() {
    this.submitted = true;
    if (this.registrationForm.invalid) {
      return;
    }
    if (this.registrationForm.controls['password'].value != this.registrationForm.controls['password'].value) {
      return;
    }
    else {
      if (this.allUsers.length == 0) {
        this.allUsers.push(this.registrationForm.value)
        localStorage.setItem('USERS', JSON.stringify(this.allUsers));
        this.router.navigate(['/login'])
        return;
      }
      else {
        this.allUsers.forEach((element:any) => {
          if(element.email == this.registrationForm.controls['email'].value){
            alert("Email Already Exists");
            return;
          }
        });
        this.allUsers.push(this.registrationForm.value);
        localStorage.setItem('USERS', JSON.stringify(this.allUsers));
        this.router.navigate(['/login'])
      }
    }
  }
  get r() {
    return this.registrationForm.controls;
  }
}
