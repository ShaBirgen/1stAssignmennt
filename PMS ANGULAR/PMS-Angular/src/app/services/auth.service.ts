// import { HttpClient } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  loginUser(details: { email: string; password: string }) {
    return this.http.post(
      'http://localhost:3000/api/auth/login',
      details
    );
  }
}
