import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { AuthService } from '../../services/auth.service';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  email: string;
  password: string;
  loginError: boolean;
  errMessage:string = ""

  constructor(/*private auth: AngularFireAuth,*/ private sharedService:SharedService, private router: Router, private service: AuthService, private api: ApiService) {
    this.email = '';
    this.password = '';
    this.loginError = false;
  }

  ngOnInit(): void {}

  /*login() {
    this.auth.signInWithEmailAndPassword(this.email, this.password)
      .then(userCredential => {
        // Login successful, you can perform additional actions here
        console.log('Login successful', userCredential.user);
        this.sharedService.setBoolValue(true)
        this.router.navigate(['/']);
      })
      .catch(error => {
        // Handle login errors
        console.log('Error during login');
        this.loginError = true;
        this.errMessage = error.message
        setTimeout(() => {
          this.loginError = false;
        }, 4000);
      });
  }*/

  login() {
    const user = {
      email: this.email,
      password: this.password,
    };
  
    this.service.loginUser(user).subscribe((res: any) => {
        this.router.navigate(['/']);
        console.log('Successfully logged in', res);
        this.sharedService.setBoolValue(true);
        this.sharedService.setUserName(res.user.user.userName);
        this.api.setToken(res.user.token);
      }, (err: any) => {
        // Handle login errors
        console.log(err.error.message);
        this.loginError = true;
        this.errMessage = err.message
        setTimeout(() => {
          this.loginError = false;
        }, 4000);
      }
    );
  }
}
