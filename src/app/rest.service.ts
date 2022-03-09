import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/userLogin.model';
import { UserSignUp } from './models/userSignUp.model';
import { Productcons } from './models/Productcons.model';
import { CartProduct } from './models/CartProduct.model';
import { Order } from './models/Orders.model';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http:HttpClient) { }

  logIn(userObj:User):Observable<string>{
    let url = 'http://localhost:8001/login'
    let header = {'content-type':'application/json'}
    let body = JSON.stringify(userObj)
    return this.http.post(url,body,{'headers':header,responseType: 'text'})
  }

  signUp(userObj:UserSignUp):Observable<string>{
    let url = 'http://localhost:8001/register'
    let header = {'content-type':'application/json'}
    let body = JSON.stringify(userObj)
    return this.http.post(url,body,{'headers':header,responseType: 'text'})
  }

  getAllProducts(){
    let url = 'http://localhost:8008/getAllProducts'
    return this.http.get(url);
  }

  getProduct(id:string | null){
    let url=`http://localhost:8008/getProduct/${id}`;
    return this.http.get(url);
  }

  insertProduct(prodCartObj:CartProduct):Observable<any>{
    let url = 'http://localhost:8001/insertProduct'
    let header = {'content-type':'application/json'}
    let body = JSON.stringify(prodCartObj)
    return this.http.post(url,body,{'headers':header,responseType: 'text'})
  }

  deleteCartProduct(uid:string,pid:string){
    let url = `http://localhost:8001/deleteProduct?uid=${uid}&pid=${pid}`;
    return this.http.delete(url)
  }

  getCartProducts(uid:any):Observable<any>{
    let url = `http://localhost:8001/getCartItems/${uid}`
    return this.http.get(url);
  }

  updateCartItems(cartObj:{}):Observable<any>{
    let url = 'http://localhost:8001/updateCartItems';
    let header = {'content-type':'application/json'}
    let body = JSON.stringify(cartObj)
    return this.http.put(url,body,{'headers':header,responseType: 'text'});
  }

  insertOrders(ordersObj:Order):Observable<any>{
    let url = 'http://localhost:8001/insertOrders'
    let header = {'content-type':'application/json'}
    let body = JSON.stringify(ordersObj)
    return this.http.post(url,body,{'headers':header,responseType: 'text'})
  }

  getOrdered(id:any):Observable<any>{
    console.log(id);
    let url = `http://localhost:8001/getOrders/${id}`
    return this.http.get(url);
  }
}