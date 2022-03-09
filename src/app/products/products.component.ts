import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Productcons } from '../models/Productcons.model';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  allProducts:Productcons[] = [];
  allProductsDup:Productcons[] = [];
  ratingArr = [1,2,3,4,5];
  productType = 'All'
  price = ''
  priceSelector = ''
  productCartCount = 0
  minPrice = ''
  maxPrice = ''

 
  constructor(private rest:RestService,private router:Router) {
    
  }
  
  //Get All Products
  getAllProducts(){
      this.rest.getAllProducts().subscribe(
        (data:any) => {
          this.allProducts = data;
          this.allProductsDup = data;
          this.findMinMax();
        },(err) => {
          console.log(err);
        }
      )
  }

  //Go To Product
  goToProduct(productId:number){
    let param = "product/"+ productId;
    this.router.navigate([param])
  }

  //Setting Low To High
  priceSelect(){
    let priceSelectorArr = this.priceSelector.trim().split("-")
    if(priceSelectorArr[0] === 'Low'){
      this.allProducts.sort( (el1:any,el2:any) =>{
        return parseFloat(el1.price) - parseFloat(el2.price)
      })
    }
    else if(priceSelectorArr[0] === 'High'){
      this.allProducts.sort( (el1:any,el2:any) =>{
        return parseFloat(el2.price) - parseFloat(el1.price)
      })
    }
  }

   getProductsData(){
    this.allProducts = this.allProductsDup
   }

  //Product Type Select

  changeProductType(){
    this.priceSelector = 'Filter'
    if(this.productType === 'All'){
      this.getProductsData() 
    }
    else if(this.productType === 'Mens'){
      this.allProducts = this.allProductsDup.filter( (prod: any) => {
        return prod.category === `men's clothing`
      })
    }
    else if(this.productType === 'Womens'){
      this.allProducts = this.allProductsDup.filter( (prod: any) => {
        return prod.category === `women's clothing`
      })
    }
    else if(this.productType === 'Electronics'){
      this.allProducts = this.allProductsDup.filter( (prod: any) => {
        return prod.category === `electronics`
      })
    }
    this.findMinMax()
  }

  //Ratings stars
   rating(star:number){
    this.getProductsData()
    this.priceSelect()
    this.allProducts = this.allProducts.filter( (prod:any) =>{
      return prod.rate <= star;
    })
   }

  //Price Range Filter Logic (yet to fix bugs)
  rangeValue =''
  maxPriceInput = ''
  onChangePriceRange(){
    let newAllProducts = this.allProductsDup.slice(0,);  
    this.allProducts = newAllProducts.filter( prod => {
      return (parseInt(this.rangeValue) >= parseInt(prod.price));
    })
    this.maxPriceInput = this.rangeValue
  }


  //Finding Min and MAx price Ranges for the price range filter
  findMinMax(){
    const newAllProducts = this.allProducts.slice(0,);
    newAllProducts.sort( (el1:any,el2:any) =>{
      return parseFloat(el1.price) - parseFloat(el2.price)
    })
    this.minPrice = newAllProducts[0].price;
    this.maxPrice = newAllProducts[this.allProducts.length - 1].price;
  }

  ngOnInit(): void {
    this.getAllProducts()
    const isLoggedIn = window.localStorage.getItem('loggedUser');
    if(isLoggedIn === null){
      this.router.navigate(['/login']);
    }
  }
}
