import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

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
  
    return this.http.post('https://localhost:7187/api/auth/change-password', obj, options)
      .pipe(
        map((response: any) => {
          if (typeof response === 'string') {
            console.log(response);
            return response;
          } else {
            // If the response is an object or any other data type, handle it accordingly
            // For example, you can access specific properties or perform additional operations
            console.log('Response from the server:', response);
            return response;
          }
        })
      );
  }
  
  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error('An error occurred:', error.error.message);
      return throwError('An error occurred on the client side. Please try again later.');
    } else {
      // Server-side error
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
      return throwError('An error occurred on the server side. Please try again later.');
    }
  }
}