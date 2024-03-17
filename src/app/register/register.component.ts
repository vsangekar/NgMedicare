import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registrationForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      patientName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      isActive: [false]
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
    if (this.registrationForm.valid) {
      // Here you can submit the form data to your backend service or handle it within the Angular application
      console.log(this.registrationForm.value);
    }
  }
}
