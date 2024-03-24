import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  onLogin(obj :any): Observable<any>{
    return this.http.post('https://localhost:7187/api/auth/login', obj);
  }
  isLoggedIn(): boolean {
    // Check if token is present in local storage or any other method to validate authentication
    return !!localStorage.getItem('token');
  }
}
