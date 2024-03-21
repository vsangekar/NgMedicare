import { Component, Input } from '@angular/core';
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
userEmail: string ="";
constructor(private formBuilder: FormBuilder, private authService :AuthService,private route:Router) { }

ngOnInit() {
  this.loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  this.getUserEmailFromToken();
}

onSubmit() {
  this.authService.onLogin(this.loginForm.value).subscribe(
    (res: any) => {
      localStorage.setItem('token', res.token);
      this.route.navigateByUrl('/dashboard');
    },
    (error) => {
      // Handle error appropriately
      console.error('Error occurred:', error);
    }
  );
}
getUserEmailFromToken(): void {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      console.log(decodedToken);
      this.userEmail = decodedToken.sub; 
      localStorage.setItem('userEmail', this.userEmail); 
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }
}
}

