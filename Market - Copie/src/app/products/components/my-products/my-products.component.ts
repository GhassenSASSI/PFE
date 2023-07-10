import { Component, DoCheck, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddProductModalComponent } from '../add-product-modal/add-product-modal.component';
import { ProductsService } from '../../services/products.service';
import { UpdateProductModalComponent } from '../update-product-modal/update-product-modal.component';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss'],
})
export class MyProductsComponent implements OnInit, DoCheck {

  dialogRef!: MatDialogRef<AddProductModalComponent, any>;
  dialogRefU!: MatDialogRef<UpdateProductModalComponent, any>;
  products:any[] = [];
  loading:boolean = false;

  constructor(private dialog: MatDialog, private service:ProductsService, private sharedService: SharedService) {}

  ngOnInit(): void {
    this.getProducts();
    console.log(this.loading);
  }

  ngDoCheck(): void {
    if (this.sharedService.getProductAdded()) {
      this.getProducts()
      this.sharedService.setProductAdded(false)
    }
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(AddProductModalComponent, {
      panelClass: 'custom-dialog-container',
      position: {top: '-25%', left: '30%'},
      width: '600px',
      height: '400px',
      enterAnimationDuration,
      exitAnimationDuration
    });
  }

  openDialogU(enterAnimationDuration: string, exitAnimationDuration: string, productId: string, description: string, price: number) {
    this.dialog.open(UpdateProductModalComponent, {
      data: { productId: productId, description: description, price: price },
      panelClass: 'custom-dialog-container',
      position: {top: '-25%', left: '30%'},
      width: '600px',
      height: '400px',
      enterAnimationDuration,
      exitAnimationDuration
    });
  }

  getProducts() {
    this.loading = true
    this.service.getMyProducts().subscribe((res:any) => {
      this.products = res
      this.loading = false
      console.log(this.products)
    }, err => {
      this.loading = false
      console.log(err.message)
    })
  }

  increaseQuantity(productId: string) {
    this.service.increaseQuantity(productId).subscribe((res: any) => {
      console.log('quantity increased successfully', res)
      const item = this.products.find((item) => item._id === productId);
      if (item) {
        item.quantity += 1;
      }
    }, (err: any) => {
      console.log(err.error)
    })
  }

  decreaseQuantity(productId: string) {
    this.service.decreaseQuantity(productId).subscribe((res: any) => {
      console.log('quantity decreased successfully', res)
      const item = this.products.find((item) => item._id === productId);
      if (item) {
        item.quantity -= 1;
      }
    }, (err: any) => {
      console.log(err.error)
    })
  }

  deleteOneProduct(productId: string) {
    this.service.deleteOneProduct(productId).subscribe((res: any) => {
      console.log('Product deleted successfully', res)
      this.getProducts()
    }, (err: any) => {
      console.log(err.error)
    })
  }

  deleteProducts() {
    this.service.deleteProducts().subscribe((res: any) => {
      console.log('All products deleted successfully', res)
      this.getProducts()
    }, (err: any) => {
      console.log(err.error)
    })
  }
}
