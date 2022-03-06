import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../rest.service';
import { CartComponent } from '../cart/cart.component';
import { Productcons } from '../models/Productcons.model';
import { CartProduct } from '../models/CartProduct.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  productId;
  productDetails:any;
  productImage = '';
  title = ''
  description=''
  category = ''
  price = 0
  rate = 0
  count = 0
  cartItems:any = [];
  loggedUser:any = window.localStorage.getItem('loggedUser')

  constructor(private router:Router,private route:ActivatedRoute,private rest:RestService) { 
    this.productId = this.route.snapshot.paramMap.get('id')
  }
  
  getCartItems(){
    this.rest.getCartProducts(this.loggedUser).subscribe(
      (data) => {
        if(data.length > 0){
          let checkProductAdded = data.filter( (item: { pid: any; }) => {
            return item.pid === this.productDetails.id
          })
          if(checkProductAdded.length > 0){
            this.addedToCart = true;
          }
          else{
            this.addedToCart = false;
          }
        }
      }
    )
  }

  //Get The Product Based ON Param
  getTheProduct(){
    this.rest.getProduct(this.productId).subscribe(
      (data) =>{
        this.getCartItems()
        this.productDetails = data;
        this.productImage = this.productDetails.image;
        this.title = this.productDetails.title;
        this.description = this.productDetails.description
        this.category = this.productDetails.category
        this.price = this.productDetails.price
        this.rate = this.productDetails.rate
      },(err) => {
        console.log(err);
      }
    )
  }
  
  //Check Product Added To cart or not

  addingProductToCart(){
    const {id,title,image,price} = this.productDetails;
      const noOfItems = 1;
      this.loggedUser = JSON.parse(this.loggedUser)
      /* console.log("id" +id,title,image,price,noOfItems,loggedUser); */
      const CartObj = new CartProduct(parseInt(this.loggedUser),id,title,image,price,noOfItems)
      this.rest.insertProduct(CartObj).subscribe(
        (data) => {
          console.log(data);
        },(err)=>{
          console.log(err);
        }
      )
  }

  removeFromCart(){
    this.rest.deleteCartProduct(this.loggedUser,this.productDetails.id).subscribe(
      (data) => {
        console.log(data);
      },(err) => {
        console.log(err);
      }
    )
  }

  addedToCart = false;
  addToCart(){
    let checker = this.addedToCart
    this.addedToCart = !checker;
    if(this.addedToCart === true){
      this.addingProductToCart()
    }
    else{
       this.removeFromCart()
    }
  }


  /* increaseProductCount(){
    this.productCartCount += 1;
  }

  decreaseProductCount(){
    if(this.productCartCount > 0)
      this.productCartCount -= 1;
  } */


  ngOnInit(): void {
    this.getTheProduct()
    const isLoggedIn = window.localStorage.getItem('loggedUser');
    if(isLoggedIn === null){
      this.router.navigate(['/login']);
    }
  }

}
