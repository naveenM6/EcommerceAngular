import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router) { }

  siteLogo = "https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
  logoutLogo = "https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"

  logOut(){
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
  }

}
