import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
  products:any[] = []
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

  addToCart(event:any, productId: string) {
    const product = {
      quantity: event.quantity
    }
    if (event.quantity < 1) {
      alert("you must enter a value")
      return
    }
    this.service.addProductToCart(productId, product).subscribe((res: any) => {
      alert(res.message)
    }, (err: any) => {
      console.log(err.error)
    })
  }
}
