import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctordropdownService } from '../../../services/dropdown/doctor/doctordropdown.service';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateAppointmentService } from '../../../services/appointment/appointment/create-appointment.service';
import { ToastrNotificationService } from '../../../services/toastr/toastr-notification.service';

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
    private createAppointment : CreateAppointmentService,
    private toastr: ToastrNotificationService,
    ) {
    this.doctordrp = doctordrp;

    this.appointmentForm = this.fb.group({
      doctorId: ['', Validators.required],
      symtoms: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      appointmentTime: ['', Validators.required],
      note: [''],
      appointmentFees: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadDoctors(); // Call the function to load doctors
  }

  loadDoctors(): void {
    this.doctordrp.getdoctors().subscribe((data: any) => {
      this.doctors = data.map((doctor: { doctorName: any; doctorId: any; }) => ({
        name: doctor.doctorName,
        id: doctor.doctorId
      }));
    });
  }

  selectDoctorById(doctorId: any): void {
    const selectedDoctor = this.doctors.find(doctor => doctor.id === doctorId);
    if (selectedDoctor) {
      this.appointmentForm.patchValue({
        doctorId: selectedDoctor.id
      });
    }
  }
  onSubmit() {
    if (this.appointmentForm.valid) {
      const formData = this.appointmentForm.value;
      if (formData.appointmentDate instanceof Date) {
        formData.appointmentDate = formData.appointmentDate.toISOString();
      }
      formData.symtoms = formData.symtoms.join(', ');
      formData.appointmentFees = Number(formData.appointmentFees);
      formData.doctorId = formData.doctorId;
      this.createAppointment.createAppointment(formData).subscribe(
        response => {
          this.toastr.showInfo("Your Appointment is successfully booked", "Success");
        },
        error => {
          console.error('Error creating appointment', error);
        }
      );
    }
  }
  
  

  closeDialog() {
    this.dialogRef.close();
  }

}
