import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError, pipe, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NavbarComponent,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private http: HttpClient, private router: Router) {}
  loginUser(details: any) {
    console.log(details);

    this.http
      .post<any>('http://localhost:3000/api/auth/login', details)
      .pipe(
        catchError((error) => {
          console.error(error); // Log the error
          return throwError(error); // Rethrow the error to propagate it
        })
      )
      .subscribe((response) => {
        console.log(response); // Handle successful registration response
        if (response.success) {
          // Registration successful, redirect to login
          this.router.navigate(['']);
          alert(response.message);
        } else {
          // Registration failed, handle error or display a message to the user
          alert('Login unsuccessful');
        }
      });
  }
}


  // constructor(
  //   private authservice: AuthService,
  //   private fb: FormBuilder,
  //   // private router: Router
  // ) {
  //   this.loginForm = this.fb.group({
  //     email: ['', [Validators.required, Validators.email]],
  //     password: ['', [Validators.required, Validators.minLength(8)]],
  //   });
  // }

  // login(details: { email: string; password: string }) {
  //   this.authservice.loginUser(details).subscribe((res) => {
  //     console.log(res);
  //   });
  // }