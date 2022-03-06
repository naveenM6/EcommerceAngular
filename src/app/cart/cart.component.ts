import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EachItem } from '../models/EachItem.model';
import { RestService } from '../rest.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Order } from '../models/Orders.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private router:Router,private rest:RestService) { }

  containItems = false;
  cartItems!:EachItem[];
  cartLength = 0
  currentUser = window.localStorage.getItem('loggedUser');
  price:number = 0
  displayModal = false
  orderSuccess = false

  cartImage = "https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-img.png"

  //getting items added to the cart
  getCartItems(){
    let uid = this.currentUser
    this.rest.getCartProducts(uid).subscribe(
      (data) => {
        this.cartItems = data;
        if(this.cartItems.length > 0){
          this.cartLength = this.cartItems.length
          this.containItems = true;
          this.setPrice()
        }
        else{
          this.containItems = false;
        }
      },(err) => {
        console.log(err);
      }
    )
  }


  //setting price and on no or items
  setPrice(){
    this.price = 0;
    for(let i=0;i<this.cartItems.length;i++){
      this.price += (this.cartItems[i].price * this.cartItems[i].numberOfItems)
    }
  }

  //Updating the quantity of an item onchage of select in cart
  productQuantity(event:any,pid:number){
    let onChangeSelectValue = event.target.value
    let cartObj = {
      uid : this.currentUser,
      pid : pid,
      productCount: onChangeSelectValue
    }
    this.rest.updateCartItems(cartObj).subscribe(
      (data) => {
        /* console.log(data); */
        this.getCartItems();
      },
      (err) => {
        console.log(err);
      }
    )
  }

  //deleting item after adding to cart
  deleteItem(uid:any,pid:any){
    /* console.log(uid,pid); */
    this.rest.deleteCartProduct(uid,pid).subscribe(
      (data) =>{
        console.log("success",data);
      },(err) =>{
        this.getCartItems()
        console.log(err)
      }
    )
  }

  //Setting event capturing
  cancelPropogation(event:Event){
    event.stopPropagation();
  }

  //changing order model form visibility
  onClickProcced(){
    this.displayModal = true
  }


  //changing order model form visibility
  cancelOrder(){
    this.displayModal = false
  }


  //OnClick Proceed Order Model Form
  orderReactiveForm = new FormGroup({
    nameReactive : new FormControl('',[Validators.required]),
    numberReactive: new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
    mailReactive: new FormControl('',[Validators.required,Validators.email]),
    addressReactive: new FormControl('',[Validators.required]),
    codReactive :new FormControl('',[Validators.required]),
  })

  get nameReactive(){
    return this.orderReactiveForm.get('nameReactive');
  }
  
  get numberReactive(){
    return this.orderReactiveForm.get('numberReactive');
  }
  
  get mailReactive(){
    return this.orderReactiveForm.get('mailReactive');
  }

  get addressReactive(){
    return this.orderReactiveForm.get('addressReactive');
  }

  get codReactive(){
    return this.orderReactiveForm.get('codReactive');
  }

  //ONclick Order Submit 
  onSubmitOrder(){
    const uid = this.currentUser
    const userName = this.orderReactiveForm.get(['nameReactive'])?.value;
    const number = this.orderReactiveForm.get(['numberReactive'])?.value;
    const email = this.orderReactiveForm.get(['mailReactive'])?.value;
    const payment = 'Cash On Delivery';
    const address = this.orderReactiveForm.get(['addressReactive'])?.value;
    const cartData = this.cartItems  
   
    if(uid !== '' && userName !== '' && number !== '' && email !== ''  && address !== ''){
      const orderObj = new Order(uid,userName,number,email,payment,address,cartData)
      this.rest.insertOrders(orderObj).subscribe(
        (data) => {
          console.log(data);
          this.cartItems.forEach( item => {
            this.deleteItem(uid,item.pid);
          })
          this.orderSuccess = true;
        },(err) => {
          console.log(err);
        }
      )
    }
  }

  ngOnInit(): void {
    this.getCartItems()
    const isLoggedIn = window.localStorage.getItem('loggedUser');
    if(isLoggedIn === null){
      this.router.navigate(['/login']);
    }
  }

}
