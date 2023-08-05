import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, DoCheck {
  @Input() data!:any
  @Output() item = new EventEmitter()
  addButton:boolean = false
  amount:number = 0
  isAdmin: boolean = false

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {}

  ngDoCheck(): void {
    this.isAdmin = this.sharedService.getIsAdmin()
  }

  add() {
    this.item.emit({item:this.data, quantity:this.amount})
  }
}
