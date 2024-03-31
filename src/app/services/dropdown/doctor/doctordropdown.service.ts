import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DoctordropdownService {
  token: string | null;
  
  constructor(private http: HttpClient) { 
    this.token = localStorage.getItem('token'); 
  }

  getdoctors(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}` 
    });
    const options = { headers };

    return this.http.get('https://api.vikrantmedicare.co.in/api/Doctor', options).pipe(
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
