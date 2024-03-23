import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangepasswordService {

  constructor(private http:HttpClient) { }

  onLogin(obj :any): Observable<any>{
    return this.http.post('https://localhost:7187/api/auth/change-password', obj);
  }
}
