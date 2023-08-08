import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ProductsService } from '../../services/products.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-product-modal',
  templateUrl: './confirm-product-modal.component.html',
  styleUrls: ['./confirm-product-modal.component.scss']
})
export class ConfirmProductModalComponent implements OnInit {

  categories: any[] = []
  selectedCategory: any = null
  showSelect: boolean = false
  categoryName: string = ''

  constructor(private sharedService: SharedService, private service: ProductsService, private dialogRef: MatDialogRef<ConfirmProductModalComponent>) {}

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories() {
    this.sharedService.getAllCategories().subscribe((res:any) => {
      this.categories = res
    }, err => {
      console.log(err.error)
    })
  }

  selectCategory() {
    /*this.selectedCategory = this.categories.find((category) => category._id === this.categoryId)
    if(this.selectedCategory && this.selectedCategory.children && this.selectedCategory.children.length > 0) {
      this.showSelect = true
    }*/
    console.log(this.categoryName)
  }

  confirmProduct() {
    const category = {
      category: this.categoryName
    }

    this.service.confirmProduct(this.sharedService.getProductId(), category).subscribe((res:any) => {
      console.log(res)
      this.sharedService.setProductConfirmed(true)
      this.closeDialog()
    }, err => {
      console.log(err.error)
    })
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
