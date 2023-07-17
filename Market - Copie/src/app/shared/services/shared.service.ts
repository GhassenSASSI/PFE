import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  loggedin:boolean = false;
  private userName: string = "";
  productAdded: boolean = false;
  isAdmin: boolean = false;

  constructor() { }

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
}
