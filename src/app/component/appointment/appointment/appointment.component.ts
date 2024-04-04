import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctordropdownService } from '../../../services/dropdown/doctor/doctordropdown.service';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateAppointmentService } from '../../../services/appointment/appointment/create-appointment.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent {
  appointmentForm!: FormGroup;
  doctors: any[] = [];
  options: string[] = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
  symptomsOptions: string[] = ['Fever', 'Cough', 'Headache', 'Fatigue'];
  appointmentTimes: string[] = [
    '8.30 to 9.00 am',
    '9.00 to 9.30 am',
    '9.30 to 10.00 am',
    '10.00 to 10.30 am',
    '10.30 to 11.00 am',
    '11.00 to 11.30 am',
    '4.30 to 5.00 pm',
    '5.00 to 5.30 pm',
    '5.30 to 6.00 pm',
    '6.00 to 6.30 pm',
    '6.30 to 7.00 pm',
    '7.00 to 7.30 pm'
  ];

  constructor(private fb: FormBuilder, 
    private doctordrp: DoctordropdownService,
    private dialogRef: MatDialogRef<AppointmentComponent>,
    private createAppointment : CreateAppointmentService
    ) {
    this.doctordrp = doctordrp;

    this.appointmentForm = this.fb.group({
      doctorId: ['', Validators.required],
      symptoms: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      appointmentTime: ['', Validators.required],
      note: [''],
      appointmentFees: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    debugger;
    this.doctordrp.getdoctors().subscribe((data: any) => {
      this.doctors = data.map((doctor: { doctorName: any; }) => doctor.doctorName);
    });
  }
  onSubmit() {
    if (this.appointmentForm.valid) {
      this.createAppointment.createAppointment(this.appointmentForm).subscribe((response)=>{
        
      })
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
