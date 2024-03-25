import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangepasswordService {
  private token: string | null; 

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token'); 
  }

  onChangePassword(obj: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}` 
    });
    const options = { headers };
  
    return this.http.post('https://localhost:7187/api/auth/change-password', obj, options)
  .pipe(
    map((response: any) => {
      if (typeof response === 'string') {
        console.log('Plain text response:', response);
        // Handle the plain text response
        const plainTextResponse = response;
        // You can perform any necessary actions with the plain text response
        // For example, display a success message to the user
        console.log('Password changed successfully.');
        return plainTextResponse; // Return the plain text response as is
      } else {
        console.log('JSON response:', response);
        const jsonResponse = response;
        return jsonResponse;
      }
    }),
    catchError((error: HttpErrorResponse) => {
      console.error('Error:', error);

      // Check if the error is a client-side error (status code 400-499)
      if (error.status >= 400 && error.status < 500) {
        // Handle client-side errors
        console.error('Client-side error:', error.error);
        // You can display an error message to the user or take any other appropriate action
      } else {
        // Handle server-side errors
        console.error('Server-side error:', error.error);
        // You can display a generic error message or take any other appropriate action
      }
      return throwError('An error occurred while changing the password. Please try again later.');
    })
  );
  }
}