import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private http: HttpClient, private api: ApiService) { }

  getProducts(): Observable<any> {
    return this.api.sendAuthorizedRequest('cart/products', 'GET')
  }

  deleteProduct(productId: string): Observable<any> {
    return this.api.sendAuthorizedRequest(`cart/products/${productId}`, 'DELETE')
  }

  deleteProducts(): Observable<any> {
    return this.api.sendAuthorizedRequest('cart/products', 'DELETE')
  }

  increaseProductQuantity(productId: string): Observable<any> {
    return this.api.sendAuthorizedRequest(`cart/products/increase/${productId}`, 'PUT')
  }

  decreaseProductQuantity(productId: string): Observable<any> {
    return this.api.sendAuthorizedRequest(`cart/products/decrease/${productId}`, 'PUT')
  }

  createNewCart(model:any) {
    return this.http.post(environment.baseApi + 'carts', model)
  }
}
