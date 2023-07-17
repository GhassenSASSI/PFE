import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent implements OnInit {
  id:any
  data:any = {}
  loading:boolean = false

  constructor(private route:ActivatedRoute, private service:ProductsService) {
    this.id = this.route.snapshot.paramMap.get("id")
  }

  ngOnInit(): void {
    this.getProduct()
  }

  getProduct() {
    this.loading = true
    this.service.getProductDetails(this.id).subscribe((res:any) => {
      this.data = res
      console.log("Product retreived successfully", res)
      this.loading = false
    }, err => {
      console.log(err.error)
      this.loading = false
    })
  }
}
