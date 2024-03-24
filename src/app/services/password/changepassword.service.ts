import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangepasswordService {
  private token: string | null; // Declare a private property to hold the token

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token'); // Get the token from localStorage
  }

  onChangePassword(obj: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}` // Use the token property
    });
    const options = { headers };

    return this.http.post('https://localhost:7187/api/auth/change-password', obj, options);
  }
}