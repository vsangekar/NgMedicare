import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  private readonly baseURL = environment.ServerUrl;

  constructor(private http: HttpClient) { }

  logout(): Observable<any> {
    return this.http.post(`${this.baseURL}/api/auth/logout`, {});
  }
}
