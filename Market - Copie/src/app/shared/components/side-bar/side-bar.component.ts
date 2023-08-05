import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  @Input() isExpanded: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

  categories:any[] = [];

  constructor(private service: SharedService) {}

  ngOnInit(): void {
    this.getCategories()
  }

  handleSidebarToggle = () => this.toggleSidebar.emit(!this.isExpanded);

  getCategories() {
    this.service.getCategories().subscribe((res:any) => {
      this.categories = res
    }, err => {
      console.log(err.error)
    })
  }
}
