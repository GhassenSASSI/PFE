import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AddProductModalComponent } from '../add-product-modal/add-product-modal.component';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss'],
})
export class MyProductsComponent implements OnInit {

  dialogRef!: MatDialogRef<AddProductModalComponent, any>;
  products:Product[] = [];
  loading:boolean = false;

  constructor(private dialog: MatDialog, private service:ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
    console.log(this.loading);
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

  getProducts() {
    this.loading = true
    this.service.getMyProducts().subscribe((res:any) => {
      this.products = res
      this.loading = false
    }, err => {
      this.loading = false
      console.log(err.message)
    })
  }
}
