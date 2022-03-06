import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';
import { User } from '../models/userLogin.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() setUser:EventEmitter<string> = new EventEmitter()
  constructor(private rest:RestService,private router:Router) { }

  arrUser:any = [];
  msg=''

  ngOnInit(): void {
    const isLoggedIn = window.localStorage.getItem('loggedUser');
    if(isLoggedIn !== null){
      this.router.navigate(['/']);
    }
  }

  loginReactiveForm = new FormGroup({
    userReactive : new FormControl('',[Validators.required]),
    passwordReactive : new FormControl('',[Validators.required,Validators.minLength(6)])
  })


  get userReactive(){
    return this.loginReactiveForm.get('userReactive');
  }
  
  get passwordReactive(){
    return this.loginReactiveForm.get('passwordReactive');
  }


  onClickLogin(){
    const userName = this.loginReactiveForm.get(['userReactive'])?.value;
    const password = this.loginReactiveForm.get(['passwordReactive'])?.value;

    const userObj = new User(userName,password);
    this.rest.logIn(userObj).subscribe(
      (data) => {
        let storeData:any = parseInt(data);
        storeData = JSON.stringify(storeData)
        window.localStorage.setItem('loggedUser',storeData);
        this.router.navigate(['/']);
      },(err) => {
        console.log(err);
        this.msg = err.error;
      }
    )
  }
}