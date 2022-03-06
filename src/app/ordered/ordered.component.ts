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

  arrangeOrders(){
    this.finalData = [...this.orderedDataFromRest];
    this.orderedItem = this.finalData.filter( (each:any) => {
      return each.orders;
    })
  }

  ngOnInit(): void {
    this.getOrdered()
  }

}
function item(item: any, arg1: (any: any) => void) {
  throw new Error('Function not implemented.');
}

