import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private api: ApiService) { }

  getUsers(): Observable<any> {
    return this.api.sendAuthorizedRequest('admin/users', 'GET')
  }

  deleteOneUser(clientId: string): Observable<any> {
    return this.api.sendAuthorizedRequest(`admin/users/${clientId}`, 'DELETE')
  }

  deleteAllUsers(): Observable<any> {
    return this.api.sendAuthorizedRequest('admin/users', 'DELETE')
  }
}
