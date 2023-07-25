import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  cartProducts:any[] = []
  total:any = 0
  success:boolean = false
  loading: boolean = false
  cartId: string = ""

  constructor(private service:CartsService, private router: Router) {}

  ngOnInit(): void {
    //this.getCartProducts()
    this.getProducts()
  }

  getProducts() {
    this.loading = true
    this.service.getProducts().subscribe((res:any) => {
      this.cartProducts = res.items
      this.cartId = res._id
      this.loading = false
      console.log(this.cartProducts)
    }, (err: any) => {
      this.loading = false
      console.log(err.error)
    })
  }

  deleteProduct(productId: string) {
    this.service.deleteProduct(productId).subscribe((res:any) => {
      console.log(res)
      if(this.cartProducts.length > 1){
        this.getProducts()
      } else {
        this.router.navigate(['/cart']);
      }
    }, (err: any) => {
      console.log(err.error)
    })
  }

  clearCart() {
    this.service.deleteProducts().subscribe((res:any) => {
      console.log(res)
      this.router.navigate(['/cart']);
    }, (err: any) => {
      console.log(err.error)
    })
  }

  increaseProductQuantity(productId: string) {
    this.service.increaseProductQuantity(productId).subscribe((res:any) => {
      console.log(res)
      const item = this.cartProducts.find((item) => item.productId === productId);
      if (item) {
        item.quantity += 1;
      }
    }, (err: any) => {
      alert(err.error.error)
    })
  }

  decreaseProductQuantity(productId: string) {
    this.service.decreaseProductQuantity(productId).subscribe((res:any) => {
      console.log(res)
      const item = this.cartProducts.find((item) => item.productId === productId);
      if (item) {
        item.quantity -= 1;
      }
    }, (err: any) => {
      alert(err.error.error)
    })
  }

  placeOrder() {
    this.service.placeOrder(this.cartId).subscribe((res:any) => {
      if(this.cartProducts.length > 0){
        console.log(res)
        this.clearCart()
        this.success = true
      }else {
        alert("You have 0 items in your cart!")
      }
    }, (err: any) => {
      console.log(err.error)
    })
  }

  /*getCartProducts() {
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
  }*/
}
