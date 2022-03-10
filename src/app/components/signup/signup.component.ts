import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Router } from '@angular/router';
import { UserSignUp } from '../models/userSignUp.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private rest:RestService,private router:Router) { }

  arrUser:any = [];
  msg=''

  ngOnInit(): void {
    const isLoggedIn = window.localStorage.getItem('loggedUser');
    if(isLoggedIn !== null){
      this.router.navigate(['/']);
    }
  }
  
  //Sign Up Reactive Form
  signUpReactiveForm = new FormGroup({
    userReactive : new FormControl('',[Validators.required,Validators.minLength(6)]),
    EmailReactive : new FormControl('',[Validators.required,Validators.email]),
    passwordReactive : new FormControl('',[Validators.required,Validators.minLength(8)])
  })

  get userReactive(){
    return this.signUpReactiveForm.get('userReactive');
  }
  
  get EmailReactive(){
    return this.signUpReactiveForm.get('EmailReactive');
  }
  
  get passwordReactive(){
    return this.signUpReactiveForm.get('passwordReactive');
  }



  // Onclick to register account
  onSignUp(){
    const userName = this.signUpReactiveForm.get(['userReactive'])?.value;
    const email = this.signUpReactiveForm.get(['EmailReactive'])?.value;
    const password = this.signUpReactiveForm.get(['passwordReactive'])?.value;

    if(userName === '' || email === '' || password === ''){
      this.msg = "*Enter All Fields";
      return;
    }

    const userObj = new UserSignUp(userName,email,password);
    this.rest.signUp(userObj).subscribe(
      (data) => {
        let storeData:any = parseInt(data);
        storeData = JSON.stringify(storeData)
        window.localStorage.setItem('loggedUser',storeData);
        this.router.navigate(['/']);
      },(err) => {
        this.msg = err.error;
      }
    )
  }
}
