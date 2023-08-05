import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-not-confirmed-product',
  templateUrl: './not-confirmed-product.component.html',
  styleUrls: ['./not-confirmed-product.component.scss']
})
export class NotConfirmedProductComponent implements OnInit {

  products: any[] = []

  constructor(private service: ProductsService) {}

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this.service.getNotConfirmedProducts().subscribe((res:any) => {
      this.products = res
    }, err => {
      console.log(err.error)
    })
  }
}
