import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
loginForm!: FormGroup;

constructor(private formBuilder: FormBuilder, private authService :AuthService,private route:Router) { }

ngOnInit() {
  this.loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
}

onSubmit() {
  this.authService.onLogin(this.loginForm.value).subscribe(
    (res: any) => {
      localStorage.setItem('token', res.token);
      this.route.navigateByUrl('/dashboard');
    },
    (error) => {
      console.error('Error occurred:', error);
    }
  );
}

}
