import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChecklogGuard implements CanActivate {
  constructor(private router:Router,private auth:AuthService){}
  canActivate(){
    if(this.auth.isUserLoggedIn() === false){
      return true;
    }
    else{
      this.router.navigate(['/'])
      return false;
    }
  }
  
}
