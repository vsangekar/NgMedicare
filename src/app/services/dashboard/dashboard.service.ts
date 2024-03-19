import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { 
  }

  getAppointment():Observable<any>{
    return this.http.get('https://api.vikrantmedicare.co.in/api/Appointment')
  }
}
