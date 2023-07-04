import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  cartProducts:any[] = []
  total:any = 0
  success:boolean = false

  constructor(private service:CartsService) {}

  ngOnInit(): void {
    this.getCartProducts()
  }

  getCartProducts() {
    if("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!)
    }
    this.getCartTotal()
  }

  increaseAmount(index:number) {
    this.cartProducts[index].quantity++
    this.getCartTotal()
    localStorage.setItem("cart", JSON.stringify(this.cartProducts))
  }

  decreaseAmount(index:number) {
    this.cartProducts[index].quantity--
    this.getCartTotal()
    localStorage.setItem("cart", JSON.stringify(this.cartProducts))
  }

  detectChange() {
    this.getCartTotal()
    localStorage.setItem("cart", JSON.stringify(this.cartProducts))
  }

  deleteProduct(index:number) {
    this.cartProducts.splice(index, 1)
    this.getCartTotal()
    localStorage.setItem("cart", JSON.stringify(this.cartProducts))
  }

  clearCart() {
    this.cartProducts = []
    this.getCartTotal()
    localStorage.setItem("cart", JSON.stringify(this.cartProducts))
  }

  getCartTotal() {
    this.total = 0
    for(let i in this.cartProducts) {
      this.total += this.cartProducts[i].item.price * this.cartProducts[i].quantity
      //this.total = this.total.toFixed(2)
    }
  }

  addCart() {
    let products = this.cartProducts.map(item => {
      return {productId:item.item.id, quantity:item.quantity}
    })
    let Model = {
      userId:5,
      date:new Date(),
      products:products
    }
    this.service.createNewCart(Model).subscribe(res => {
      if(this.cartProducts.length > 0){
        this.success = true
      }else {
        alert("You have 0 items in your cart!")
      }
      this.clearCart()
    }, err => {
      console.log(err.message)
    })
    console.log(Model)
  }
}
