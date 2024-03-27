import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pre-login',
  templateUrl: './pre-login.component.html',
  styleUrls: ['./pre-login.component.css']
})
export class PreLoginComponent {
  @Output() exitLoginPageEvent: EventEmitter<void> = new EventEmitter<void>(); // will probably change void to something else later.

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
    this.exitLoginPageEvent.emit();
  }

  signUpSubmit() {
    if(this.signUpForm.invalid) {
      alert("Please fill out all the fields. (Make sure email is an actual email)")
      return;
    }

    alert("User registered!")
    this.changeForm()
  }


  changeForm() {
    this.wantsToLogin = !this.wantsToLogin
  }

  get changeText() {
    return this.wantsToLogin ? "Sign Up" : "Log In"
  }
}
