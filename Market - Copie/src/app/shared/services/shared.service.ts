import { Injectable } from '@angular/core';
import { User } from 'src/app/auth/models/user';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  loggedin:boolean = false;
  private userName: string = "";

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
}
