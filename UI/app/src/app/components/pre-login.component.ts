import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { APITalkerService } from '../services/apitalker.service';
import { Subscription } from 'rxjs';
import { User } from '../types/types';

@Component({
  selector: 'app-pre-login',
  templateUrl: './pre-login.component.html',
  styleUrls: ['./pre-login.component.css']
})
export class PreLoginComponent implements OnDestroy {
  @Output() exitLoginPageEvent: EventEmitter<void> = new EventEmitter<void>(); // will probably change void to something else later.

  wantsToLogin: boolean = true
  loginForm: FormGroup
  signUpForm: FormGroup

  loginSub?: Subscription
  signUpSub?: Subscription


  constructor(private talker: APITalkerService) {
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

  ngOnDestroy(): void {
      this.loginSub?.unsubscribe()
      this.signUpSub?.unsubscribe()
  }


  loginSubmit() {
    if(this.loginForm.invalid) {
      alert("Please fill out all the fields.")
      return;
    }

    
    this.loginSub = this.talker.attemptLogin(this.loginForm.controls['username'].value,this.loginForm.controls['password'].value).subscribe({
      next: (arg: User) => {
        alert("Signed in succesfully")
        this.exitLoginPageEvent.emit()
      },
      error: (arg) => {
        alert(arg.error) // this is how you get the error message passed in.
      }
    })
  }

  signUpSubmit() {
    if(this.signUpForm.invalid) {
      alert("Please fill out all the fields. (Make sure email is an actual email)")
      return;
    }

    this.signUpSub = this.talker.attemptSignUp(this.signUpForm.controls['username'].value,this.signUpForm.controls['email'].value,this.signUpForm.controls['password'].value).subscribe({
      next: () => {
        alert("User registered!")
        this.changeForm()   
      },
      error: (arg) => {
        alert(arg.error)
      }
    })
  }


  changeForm() {
    this.wantsToLogin = !this.wantsToLogin
  }

  get changeText() {
    return this.wantsToLogin ? "Sign Up" : "Log In"
  }
}
