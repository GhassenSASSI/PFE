import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  userName:string;
  email:string;
  password:string;
  confirmPassword:string;
  errMessage:string = "";
  error:boolean = false

  constructor(/*private auth: AngularFireAuth, private db: AngularFireDatabase*/ private service: AuthService) {
    this.userName = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }

  ngOnInit(): void {
    //this.retrieveUsers();
  }

  passwordsMatch(): boolean {
    return this.password === this.confirmPassword;
  }

  /*register() {
    this.auth.createUserWithEmailAndPassword(this.email, this.password)
      .then(userCredential => {
        // L'inscription a réussi, vous pouvez effectuer des actions supplémentaires ici
        console.log('Inscription réussie', userCredential.user);
      })
      .catch(error => {
        // Gérer les erreurs d'inscription
        console.log('Erreur lors de l\'inscription');
        this.error = true
        this.errMessage = error.message
        setTimeout(() => {
          this.error = false;
        }, 4000);
      });
  }*/

  register() {
    const user = {
      userName: this.userName,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    };
  
    this.service.registerUser(user).subscribe((res: any) => {
        // Registration successful, you can perform additional actions here
        console.log('Registration successful', res);
      }, (err: any) => {
        // Handle registration errors
        console.log('Error during registration');
        this.error = true;
        this.errMessage = err.message;
        setTimeout(() => {
          this.error = false;
        }, 4000);
      }
    );
  }
}
