import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';
import { SocketService } from 'src/app/socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy  {

  orders:any[] = []
  loading: boolean = false
  newOrderSubscription!: Subscription;

  constructor(private service: CartsService, private socketService: SocketService) {}

  ngOnInit(): void {
    this.getOrders()
    this.subscribeToNewOrders();
    this.socketService.setNewOrder(false);
  }

  ngOnDestroy(): void {
    this.newOrderSubscription.unsubscribe();
  }

  getOrders() {
    this.loading = true
    this.service.getOrders().subscribe((res:any) => {
      this.orders = res
      this.loading = false
      console.log(this.orders)
    }, (err: any) => {
      this.loading = false
      console.log(err.error)
    })
  }

  private subscribeToNewOrders() {
    this.newOrderSubscription = this.socketService
      .listenForNewOrder()
      .subscribe((newOrderData: any) => {
        console.log('New order received:', newOrderData);
        this.orders.push(newOrderData);
      });
  }
}
