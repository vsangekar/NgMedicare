import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class DoctordropdownService {
  private readonly baseURL = environment.ServerUrl;

  constructor(private http: HttpClient) {}

  getdoctors(): Observable<any> {
    return this.http.get(`${this.baseURL}/api/Doctor`);
  }
}
