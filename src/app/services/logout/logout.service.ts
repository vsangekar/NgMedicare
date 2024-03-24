import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private http:HttpClient) { 
  }

  logout(): Observable<any> {
    return this.http.post('https://localhost:7187/api/auth/logout', {});
  }
}
