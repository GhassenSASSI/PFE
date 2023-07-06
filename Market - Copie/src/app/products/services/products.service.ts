import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { environment } from 'src/environments/environments';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient, private api: ApiService) { }

  getAllProducts(): Observable<any> {
    return this.http.get(environment.baseApi + 'products/allProducts')
  }

  getMyProducts(): Observable<any> {
    return this.api.sendAuthorizedRequest('products/products', 'GET')
  }

  addProduct(product: any): Observable<any> {
    return this.api.sendAuthorizedRequest('products/products', 'POST', product)
  }

  updateProduct(product: any, productId: string): Observable<any> {
    return this.api.sendAuthorizedRequest(`products/products/${productId}`, 'PUT', product)
  }

  increaseQuantity(productId: string): Observable<any> {
    return this.api.sendAuthorizedRequest(`products/products/increase/${productId}`, 'PUT')
  }

  decreaseQuantity(productId: string): Observable<any> {
    return this.api.sendAuthorizedRequest(`products/products/decrease/${productId}`, 'PUT')
  }

  /*getAllCategories() {
    return this.http.get(environment.baseApi + 'products/categories')
  }*/

  getProductsByCategory(value:string) {
    return this.http.get(environment.baseApi + 'products/category/' + value)
  }

  getProductById(id:any) {
    return this.http.get(environment.baseApi + 'products/' + id)
  }
}
