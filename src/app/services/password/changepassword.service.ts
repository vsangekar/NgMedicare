import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ChangepasswordService {
  private readonly baseURL = environment.ServerUrl;
  
  constructor(private http: HttpClient) {}

  onChangePassword(obj: any): Observable<any> {
    return this.http.post(`${this.baseURL}/api/auth/change-password`, obj);
  }
}
