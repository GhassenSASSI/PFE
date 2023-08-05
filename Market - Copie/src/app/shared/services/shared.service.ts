import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  loggedin:boolean = false;
  private userName: string = "";
  productAdded: boolean = false;
  isAdmin: boolean = false;
  products: any[] = [];
  dataReady: boolean = false;

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get(environment.baseApi + 'categories/categories')
  }

  setBoolValue(value:boolean) {
    this.loggedin = value
  }

  getBoolValue(): boolean {
    return this.loggedin;
  }

  setUserName(value:string) {
    this.userName = value;
  }

  getUserName(): string {
    return this.userName;
  }

  setProductAdded(value: boolean) {
    this.productAdded = value;
  }

  getProductAdded(): boolean {
    return this.productAdded;
  }

  setIsAdmin(value: boolean) {
    this.isAdmin = value;
  }

  getIsAdmin(): boolean {
    return this.isAdmin;
  }

  setProducts(value: any) {
    this.products = value;
  }

  getProducts(): any {
    return this.products;
  }

  setDataReady(value: boolean) {
    this.dataReady = value;
  }

  getDataReady(): boolean {
    return this.dataReady;
  }
}
