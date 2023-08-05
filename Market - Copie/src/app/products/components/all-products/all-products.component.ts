import { Component, OnInit, HostListener } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { SharedService } from 'src/app/shared/services/shared.service';

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
  sidebarExpanded = true;
  isFixed: boolean = false;

  constructor(private service:ProductsService, private sharedService: SharedService) {}

  ngOnInit(): void {
    this.getProducts()
    //this.getCategories()
  }

  getProducts() {
    this.loading = true
    this.service.getAllProducts().subscribe((res:any) => {
      this.products = res
      this.sharedService.setProducts(this.products)
      this.sharedService.setDataReady(true)
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

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    // Get the reference to the main content element
    const mainContent = document.querySelector('.box') as HTMLElement;

    // Get the current scroll position
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    // Get the height of the main content area where you want to fix the sidebar
    const mainContentHeight = mainContent.offsetHeight;

    // Get the height of the sidebar element
    const sidebar = document.querySelector('.col-md-2') as HTMLElement;
    const sidebarHeight = sidebar.offsetHeight;

    // Calculate the point where the sidebar should be fixed
    const fixedPoint = mainContentHeight - sidebarHeight - 100; // Adjust the value as needed

    // Update the sidebarExpanded flag based on the scroll position
    this.isFixed = scrollPosition > fixedPoint;
  }
}
