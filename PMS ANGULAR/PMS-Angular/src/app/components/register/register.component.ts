import { Component, NgModule } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import {MessageService} from 'primeng/api';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NavbarComponent, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) {}

  registerUser(details: any) {
    console.log(details);

    this.http
      .post<any>('http://localhost:3000/api/auth/register', details)
      .pipe(
        catchError((error) => {
          console.error(error); // Log the error
          // Display error toast
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Registration failed',
          });
          return throwError(error); // Rethrow the error to propagate it
        })
      )
      .subscribe((response) => {
        console.log(response); // Handle successful registration response
        if (response.success) {
          // Registration successful, redirect to login
          this.router.navigate(['/']);
          alert(response.message);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'User registered successfully',
          }); // Display success toast
        } else {
          // Registration failed, handle error or display a message to the user
          alert('Registration unsuccessful');
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Registration failed',
          }); // Display error toast
        }
      });
  }
}
