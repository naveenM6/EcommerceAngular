import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductComponent } from './components/product/product.component';
import { OrderedComponent } from './components/ordered/ordered.component';
import { AuthGuard } from './guards/auth.guard';
import { ChecklogGuard } from './guards/checklog.guard';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '', component: HomeComponent,canActivate:[AuthGuard]},
  {path: 'login', component: LoginComponent,canActivate:[ChecklogGuard]},
  {path: 'signup', component: SignupComponent,canActivate:[ChecklogGuard]},
  {path: 'products', component: ProductsComponent,canActivate:[AuthGuard]},
  {path: 'product/:id', component:ProductComponent,canActivate:[AuthGuard]},
  {path: 'cart', component: CartComponent,canActivate:[AuthGuard]},
  {path:'orders',component: OrderedComponent,canActivate:[AuthGuard]},
  {path:'**', component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { 
}
