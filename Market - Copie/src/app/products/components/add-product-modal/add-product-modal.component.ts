import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from '../../services/products.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.scss']
})
export class AddProductModalComponent implements OnInit {

  photo: string
  name: string
  quantity: number
  description: string
  rate: number
  price: number
  categories: any[] = []
  selectedCategory: any = null
  showSelect: boolean = false
  categoryId: string = ''

  constructor (private service: ProductsService, private dialogRef: MatDialogRef<AddProductModalComponent>, private sharedService: SharedService) {
    this.photo = ''
    this.name = ''
    this.quantity = -1
    this.description = ''
    this.rate = -1
    this.price = -1
  }

  ngOnInit(): void {
    //this.getCategories()
  }

  addProduct() {
    const product = {
      photo: this.photo,
      name: this.name,
      quantity: this.quantity,
      description: this.description,
      rate: this.rate,
      price: this.price
    }

    this.service.addProduct(product).subscribe((res: any) => {
      console.log('product added successfully', res)
      this.closeDialog()
      this.sharedService.setProductAdded(true)
    }, (err: any) => {
      console.log(product)
      console.log(err.error)
      this.closeDialog()
    })
  }

  onPhotoSelected(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      const photo = files[0];
  
      const uploadFolderPath = 'assets/uploads/';
      const filePath = uploadFolderPath + photo.name;
  
      console.log('File stored successfully:', filePath);
      this.photo = filePath;
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  getCategories() {
    this.sharedService.getCategories().subscribe((res:any) => {
      this.categories = res
    }, err => {
      console.log(err.error)
    })
  }

  selectCategory() {
    this.selectedCategory = this.categories.find((category) => category._id === this.categoryId)
    if(this.selectedCategory && this.selectedCategory.children && this.selectedCategory.children.length > 0) {
      this.showSelect = true
    }
    //this.showSelect = false
    console.log(this.categoryId)
  }
}