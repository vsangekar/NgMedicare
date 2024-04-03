import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  private readonly baseURL = environment.ServerUrl
  constructor(private http: HttpClient) { }

  logout(): Observable<any> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.post(`${this.baseURL}/api/auth/logout`, {}, { headers: headers });
    } else {
      return new Observable(observer => {
        observer.error('Token not found in local storage');
      });
    }
  }
}
