import { Component, DoCheck, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmProductModalComponent } from '../confirm-product-modal/confirm-product-modal.component';
import { SharedService } from 'src/app/shared/services/shared.service';
import { SocketService } from 'src/app/socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-not-confirmed-product',
  templateUrl: './not-confirmed-product.component.html',
  styleUrls: ['./not-confirmed-product.component.scss']
})
export class NotConfirmedProductComponent implements OnInit, DoCheck {

  products: any[] = []
  newProductSubscription!: Subscription;

  constructor(private service: ProductsService, private dialog: MatDialog, private sharedService: SharedService, private socketService: SocketService) {}

  ngOnInit(): void {
    this.getProducts()
    this.subscribeToNewProducts()
    this.socketService.setNewProduct(false);
  }

  ngDoCheck(): void {
    if(this.sharedService.getProductConfirmed()) {
      this.getProducts()
      this.sharedService.setProductConfirmed(false)
    }
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, id: string) {
    this.dialog.open(ConfirmProductModalComponent, {
      panelClass: 'custom-dialog-container',
      position: {top: '-25%', left: '30%'},
      width: '600px',
      height: '400px',
      enterAnimationDuration,
      exitAnimationDuration
    });
    this.sharedService.setProductId(id);
  }

  getProducts() {
    this.service.getNotConfirmedProducts().subscribe((res:any) => {
      this.products = res
    }, err => {
      console.log(err.error)
    })
  }

  private subscribeToNewProducts() {
    this.newProductSubscription = this.socketService
      .listenForNewProduct()
      .subscribe((newProductData: any) => {
        console.log('New product received:', newProductData);
        this.products.push(newProductData);
      });
  }
}
