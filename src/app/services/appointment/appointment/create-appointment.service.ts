import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CreateAppointmentService {

  constructor(private http: HttpClient) { }

  private readonly baseURL = environment.ServerUrl;

  createAppointment(appointmentData: any): Observable<any> {
    const apiUrl = `${this.baseURL}/api/Appointment`;
    return this.http.post(apiUrl, appointmentData);
  }

  getAppointment(){
    const apiUrl = `${this.baseURL}/api/Appointment`;
    return this.http.get(apiUrl);
  }
}
