import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {

  users:any[] = [];

  constructor (private service: UsersService) {}

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.service.getUsers().subscribe((res:any) => {
      this.users = res
      console.log(this.users)
    }, err => {
      console.log(err.error)
    })
  }

  deleteOneUser(clientId: string) {
    this.service.deleteOneUser(clientId).subscribe((res: any) => {
      console.log('User deleted successfully', res)
      this.getUsers()
    }, (err: any) => {
      console.log(err.error)
    })
  }

  deleteUsers() {
    this.service.deleteAllUsers().subscribe((res: any) => {
      console.log('All users deleted successfully', res)
      this.getUsers()
    }, (err: any) => {
      console.log(err.error)
    })
  }
}
