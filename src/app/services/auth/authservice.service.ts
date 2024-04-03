import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; // Import isPlatformBrowser
import { Observable } from 'rxjs';
import { environment } from '../../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseURL = environment.ServerUrl
  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  onLogin(obj: any): Observable<any> {
    return this.http.post(`${this.baseURL}/api/auth/login`, obj);
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      return !!token; 
    }
    return false;
  }
}

