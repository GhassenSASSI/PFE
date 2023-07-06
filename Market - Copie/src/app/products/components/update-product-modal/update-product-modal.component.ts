import { Component, Inject, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-product-modal',
  templateUrl: './update-product-modal.component.html',
  styleUrls: ['./update-product-modal.component.scss']
})
export class UpdateProductModalComponent implements OnInit {

  description: string
  price: number

  constructor (private service: ProductsService, private dialogRef: MatDialogRef<UpdateProductModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.description = this.data.description
    this.price = this.data.price
  }

  ngOnInit(): void {

  }

  updateProduct() {
    const product = {
      description: this.description,
      price: this.price
    }

    this.service.updateProduct(product, this.data.productId).subscribe((res: any) => {
      console.log('product updated successfully', res)
      this.closeDialog()
    }, (err: any) => {
      console.log(product)
      console.log(err.error)
      this.closeDialog()
    })
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
