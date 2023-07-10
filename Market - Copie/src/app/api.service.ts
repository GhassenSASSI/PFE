import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environments';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './auth/models/user';
import { SharedService } from './shared/services/shared.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.baseApi;
  private user: User | null = null;
  private token:string = '';

  constructor(private http: HttpClient, private router: Router, private sharedService: SharedService) {}

  // Method to send authorized API requests
  sendAuthorizedRequest<T>(endpoint: string, method: string, body?: any): Observable<T> {
    const token = this.token;

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.request<T>(method, `${this.apiUrl}${endpoint}`, { body, headers });
    } else {
      this.router.navigate(['/login']);
      return throwError('Authentication failed. Please log in.');
    }
  }

  // Fetch the token from the database using an API endpoint
  fetchTokenFromDatabase(): Observable<string> {
    return this.http.get<string>(this.apiUrl + 'auth/token').pipe(
      catchError(() => {
        throw new Error('Failed to fetch authentication token. Please try again.');
      })
    );
  }

  // Get the authenticated user
  getAuthenticatedUser(): Observable<User> {
    if (this.user) {
      // If the authenticated user is already available, return it as an observable
      return of(this.user);
    } else {
      // Otherwise, send the request to retrieve the authenticated user
      return this.sendAuthorizedRequest<User>('GET', 'auth/user').pipe(
        tap((user: User) => {
          this.user = user; // Store the authenticated user in the variable
        }),
        catchError((error: any) => {
          return throwError(error.message);
        })
      );
    }
  }

  setToken(value: string) {
    this.token = value;
  }
}
