import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ToastrNotificationService } from '../../services/toastr/toastr-notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm!: FormGroup<any>;
  alertMessage: any;
  constructor(private formBuilder: FormBuilder,private sanitizer: DomSanitizer, private toaster: ToastrNotificationService) { }

  ngOnInit(): void {
    this. registerForm= this.formBuilder.group({
      patientName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      isActive: [false],
      password:['', Validators.required],
      confirmPassword: ['', [Validators.required]]
    });
  }

  imageUrl: SafeUrl | undefined;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(reader.result as string);
    };

    reader.readAsDataURL(file);
  }
  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.toaster.showInfo("All fields Inserted SuccessFully","success");
    } else {
      this.toaster.showError("All field are required","error!");
    }
  }
}
