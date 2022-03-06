import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
@Component({
  selector: 'app-ordered',
  templateUrl: './ordered.component.html',
  styleUrls: ['./ordered.component.css']
})
export class OrderedComponent implements OnInit {

  constructor(private rest:RestService) { }

  orderedDataFromRest:any;

  finalData:any;

  orderedItem:any;
  isHavingOrders:number = 0;
  activeUser = window.localStorage.getItem('loggedUser');

  //Fetching Ordered data based on active user ID
   getOrdered(){
    this.rest.getOrdered(this.activeUser).subscribe(
      (data) => {
        this.orderedDataFromRest = data;
        this.isHavingOrders = data.length;
        this.arrangeOrders()
      },
      (err) => {
        console.log(err);
      }
    )
  }


  //Creating a new array instead of making changes in original array
  arrangeOrders(){
    this.finalData = [...this.orderedDataFromRest];
    /* this.orderedItem = this.finalData.filter( (each:any) => {
      return each.orders;
    }) */
  }

  ngOnInit(): void {
    this.getOrdered()
  }

}
function item(item: any, arg1: (any: any) => void) {
  throw new Error('Function not implemented.');
}

