import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router) { }

  homeImage = 'https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png'

  ngOnInit(): void {
    const isLoggedIn = window.localStorage.getItem('loggedUser');
    if(isLoggedIn === null){
      this.router.navigate(['/login']);
    }
  }

}
