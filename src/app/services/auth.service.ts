import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router) { }

  isUserLoggedIn(){
    const isLoggedIn = window.localStorage.getItem('loggedUser');
    if(isLoggedIn === null){
      return false;
    }
    else{
      return true;
    }
  }

}
