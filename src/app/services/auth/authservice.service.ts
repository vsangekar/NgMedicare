import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; // Import isPlatformBrowser
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  onLogin(obj: any): Observable<any> {
    return this.http.post('https://api.vikrantmedicare.co.in/api/auth/login', obj);
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      // Check if token is present in local storage
      const token = localStorage.getItem('token');
      return !!token; // Return true if token exists, false otherwise
    }
    return false; // Return false if not in browser platform
  }
}

