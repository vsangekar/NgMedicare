import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateAppointmentService {

  constructor(private http: HttpClient) { }

  createAppointment(appointmentData: any): Observable<any> {
    const apiUrl = 'https://localhost:7187/api/Appointment';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers };

    return this.http.post(apiUrl, appointmentData, options);
  }
}
