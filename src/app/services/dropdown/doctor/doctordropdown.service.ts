import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class DoctordropdownService {
  token: string | null;
  private readonly baseURL = environment.ServerUrl
  constructor(private http: HttpClient) { 
    this.token = localStorage.getItem('token'); 
  }

  getdoctors(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}` 
    });
    const options = { headers };

    return this.http.get(`${this.baseURL}/api/Doctor`, options).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {

      console.error('Unauthorized access. Redirecting to login page.');
    }
    return throwError('Something bad happened; please try again later.');
  }
}
