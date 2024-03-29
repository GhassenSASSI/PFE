import { Component, DoCheck, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { LoginComponent } from 'src/app/auth/components/login/login.component';
import { SharedService } from '../../services/shared.service';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements DoCheck{
  isLoggedIn: boolean = false;
  isShining: boolean = false;
  isDropdownOpen: boolean = false;
  isAdmin: boolean = false;
  userName: string = "";
  newOrder: boolean = false;
  newProduct: boolean = false;

  constructor(private sharedService: SharedService, private authService: AuthService, private router: Router, private api: ApiService, private socketService: SocketService) {}

  ngDoCheck(): void {
    this.isLoggedIn = this.sharedService.getBoolValue();
    this.userName = this.sharedService.getUserName();
    this.isAdmin = this.sharedService.getIsAdmin();
    this.newOrder = this.socketService.getNewOrder();
    this.newProduct = this.socketService.getNewProduct();
  }

  startShining() {
    this.isShining = true;
  }
  
  stopShining() {
    this.isShining = false;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    console.log(this.isDropdownOpen);
  }

  logout() {
    this.authService.logoutUser().subscribe(
      () => {
        // Optionally, perform additional actions after logout
        console.log('Successfully logged out');
        this.router.navigate(['/login']);
        this.sharedService.setBoolValue(false);
        this.sharedService.setUserName('');
        this.api.setToken('');
      },
      (err: any) => {
        // Handle logout errors
        console.log(err.error.message);
      }
    );
  }
}
