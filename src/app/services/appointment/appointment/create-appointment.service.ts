import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CreateAppointmentService {

  constructor(private http: HttpClient) { }
  private readonly baseURL = environment.ServerUrl
  createAppointment(appointmentData: any): Observable<any> {
    const apiUrl = `${this.baseURL}/api/Appointment`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers };

    return this.http.post(apiUrl, appointmentData, options);
  }
}

