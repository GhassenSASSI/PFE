import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: any;
  private socketServerAddress: string;
  public newOrder: boolean;
  public newProduct: boolean;

  constructor() {
    this.socketServerAddress = environment.baseApi.replace('/api/', '');
    this.socket = io(this.socketServerAddress);
    this.newOrder = false;
    this.newProduct = false;
  }

  // Function to listen for 'newOrder' events
  listenForNewOrder(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('newOrder', (data: any) => {
        this.newOrder = true;
        observer.next(data);
      });
    });
  }

  // Function to listen for 'newProduct' events
  listenForNewProduct(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('newProduct', (data: any) => {
        this.newProduct = true;
        observer.next(data);
      });
    });
  }

  setNewOrder(value:boolean) {
    this.newOrder = value;
  }

  getNewOrder(): boolean {
    return this.newOrder;
  }

  setNewProduct(value:boolean) {
    this.newProduct = value;
  }

  getNewProduct(): boolean {
    return this.newProduct;
  }
}