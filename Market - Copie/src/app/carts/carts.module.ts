import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './components/cart/cart.component';
import { FormsModule } from '@angular/forms';
import { OrderComponent } from './components/order/order.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    CartComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ]
})
export class CartsModule { }
