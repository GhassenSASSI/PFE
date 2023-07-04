import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private api: ApiService) { }

  registerUser(user: any): Observable<any> {
    return this.http.post(environment.baseApi + 'auth/register', user);
  }

  loginUser(user: any): Observable<any> {
    return this.http.post(environment.baseApi + 'auth/login', user);
  }

  logoutUser(): Observable<any> {
    return this.api.sendAuthorizedRequest('auth/logout', 'GET');
  }
}
