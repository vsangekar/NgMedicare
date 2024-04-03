import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ChangepasswordService {
  private token: string | null; 
  private readonly baseURL = environment.ServerUrl
  
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token'); 
  }

  onChangePassword(obj: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}` 
    });
    const options = { headers };
  
    return this.http.post(`${this.baseURL}/api/auth/change-password`, obj, options)
  
  }
}