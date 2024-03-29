import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { ProductsDetailsComponent } from './products/components/products-details/products-details.component';
import { CartComponent } from './carts/components/cart/cart.component';
import { MyProductsComponent } from './products/components/my-products/my-products.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { AllUsersComponent } from './users/components/all-users/all-users.component';
import { OrderComponent } from './carts/components/order/order.component';
import { NotConfirmedProductComponent } from './products/components/not-confirmed-product/not-confirmed-product.component';

const routes: Routes = [
  {path:"products", component:AllProductsComponent},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"myProducts", component:MyProductsComponent},
  {path:"details/:id", component:ProductsDetailsComponent},
  {path:"cart", component:CartComponent},
  {path:"users", component:AllUsersComponent},
  {path:"orders", component:OrderComponent},
  {path:"notConfirmedProducts", component:NotConfirmedProductComponent},
  {path:"**", redirectTo:"products", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
