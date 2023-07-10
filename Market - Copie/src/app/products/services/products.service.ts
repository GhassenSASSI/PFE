import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { environment } from 'src/environments/environments';

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

  deleteOneProduct(productId: string): Observable<any> {
    return this.api.sendAuthorizedRequest(`products/products/${productId}`, 'DELETE')
  }

  deleteProducts(): Observable<any> {
    return this.api.sendAuthorizedRequest('products/products', 'DELETE')
  }

  addProductToCart(productId: string, product: any): Observable<any> {
    return this.api.sendAuthorizedRequest(`cart/products/${productId}`, 'POST', product)
  }
}
