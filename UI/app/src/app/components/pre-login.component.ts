import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pre-login',
  templateUrl: './pre-login.component.html',
  styleUrls: ['./pre-login.component.css']
})
export class PreLoginComponent {
  wantsToLogin: boolean = true
  loginForm: FormGroup
  signUpForm: FormGroup

  constructor() {
    this.loginForm = new FormGroup({
      username: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required)
    })

    this.signUpForm = new FormGroup({
      username: new FormControl('',Validators.required),
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',Validators.required)
    })
  }


  loginSubmit() {
    if(this.loginForm.invalid) {
      alert("Please fill out all the fields.")
      return;
    }

    console.log(this.loginForm.controls)
  }

  signUpSubmit() {
    if(this.signUpForm.invalid) {
      alert("Please fill out all the fields. (Make sure email is an actual email)")
      return;
    }

    console.log(this.signUpForm.controls)
  }


  changeForm() {
    this.wantsToLogin = !this.wantsToLogin
  }

  get changeText() {
    return this.wantsToLogin ? "Sign Up" : "Log In"
  }
}
