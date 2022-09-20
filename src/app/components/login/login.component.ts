import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  [x: string]: any;
loginForm:FormGroup;
  constructor(private fb:FormBuilder,private router:Router) {
    this.loginForm=this.fb.group({
      email:['',[Validators.required]],
      password:['',[Validators.required]] 
    })
   }
   allUsers:any=[];
  ngOnInit(): void {
    this.allUsers = [];
    if (localStorage.getItem('USERS') != null) {
      this.allUsers = JSON.parse(localStorage.getItem('USERS')!);
    }
  }

  login(){
    this.submitted=true;
    if(this.loginForm.invalid){
      return;
    }
    else{
        if(this.allUsers.length==0){
          alert("No User Found.");
          return;
          }
      this.allUsers.forEach((element:any) => {
        if(element.email == this.loginForm.controls['email']?.value && element.password == this.loginForm.controls['password']?.value){
          localStorage.setItem('loginToken','TATWASOFTLOGINTOKEN');
          this.router.navigate(['/products']);
        }
        else{
          alert("Invalid Credientials.")
        }
      });
    }
  }
  submitted:boolean=false;
  get l (){
    return this.loginForm.controls;
  }
}
