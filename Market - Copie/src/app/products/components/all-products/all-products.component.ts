import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
  products:Product[] = []
  categories:string[] = []
  loading:boolean = false
  cartProducts:any[] = []

  constructor(private service:ProductsService) {}

  ngOnInit(): void {
    this.getProducts()
    //this.getCategories()
  }

  getProducts() {
    this.loading = true
    this.service.getAllProducts().subscribe((res:any) => {
      this.products = res
      this.loading = false
    }, err => {
      console.log(err.error.message)
      this.loading = false
    })
  }

  /*getCategories() {
    this.loading = true
    this.service.getAllCategories().subscribe((res:any) => {
      this.categories = res
      this.loading = false
    }, err => {
      console.log(err.message)
      this.loading = false
    })
  }*/

  filterCategory(event:any) {
    let value = event.target.value
    this.loading = true
    this.service.getProductsByCategory(value).subscribe((res:any) => {
      if(value == 'all') {
        this.getProducts()
      }else {
        this.products = res
      }
      this.loading = false
    }, err => {
      console.log(err.message)
      this.loading = false
    })
  }

  addToCart(event:any) {
    let productNumber = event.quantity
    if("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!)
      let exist = this.cartProducts.find(item => item.item.id == event.item.id)
      if(exist) {
        alert("Product is already in your cart")
      }else if(productNumber <= 0) {
        alert("Product quantity is invalid")
      }else {
        this.cartProducts.push(event)
        localStorage.setItem("cart", JSON.stringify(this.cartProducts))
      }
    }else {
      if(productNumber <= 0) {
        alert("Product quantity is invalid")
      }else {
        this.cartProducts.push(event)
        localStorage.setItem("cart", JSON.stringify(this.cartProducts))
      }
    }
  }
}
