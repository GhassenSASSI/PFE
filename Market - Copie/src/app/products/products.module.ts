import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductsDetailsComponent } from './components/products-details/products-details.component';
import { SharedModule } from '../shared/shared.module';
import { ProductComponent } from './components/product/product.component';
import { RouterModule } from '@angular/router';
import { MyProductsComponent } from './components/my-products/my-products.component';
import { AddProductModalComponent } from './components/add-product-modal/add-product-modal.component';
import { UpdateProductModalComponent } from './components/update-product-modal/update-product-modal.component';
import { NotConfirmedProductComponent } from './components/not-confirmed-product/not-confirmed-product.component';
import { ConfirmProductModalComponent } from './components/confirm-product-modal/confirm-product-modal.component';




@NgModule({
  declarations: [
    AllProductsComponent,
    ProductsDetailsComponent,
    ProductComponent,
    MyProductsComponent,
    AddProductModalComponent,
    UpdateProductModalComponent,
    NotConfirmedProductComponent,
    ConfirmProductModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class ProductsModule { }
