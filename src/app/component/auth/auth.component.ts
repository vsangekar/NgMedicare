declare let google: any;
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/authservice.service';
import { Router } from '@angular/router';
import { ToastrNotificationService } from '../../services/toastr/toastr-notification.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  showPassword: boolean = false;
  loginForm!: FormGroup;
  userName: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: Router,
    private toastrNotificationService: ToastrNotificationService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['Vikrant@gmail.com', [Validators.required, Validators.email]],
      password: ['Vikrant@1234', Validators.required],
    });
    google.accounts.id.initialize({
      client_id: '685533424375-hc7e27mdip34to87qdkqv6mbgm63qvfr.apps.googleusercontent.com',
      auto_select: false,
      cancel_on_tap_outside: true,
      prompt: 'consent',
      callback: (resp: any) => {
        //this.handlelogin(resp);
        console.log(resp);
      }
    });
    google.accounts.id.renderButton(document.getElementById("google_btn"), {
      theme: 'filled_white',
      size: 'large',
      width: '100%',
      maxWidth: '500px'
    });
  }
  

  onSubmit() {
    this.authService.onLogin(this.loginForm.value).subscribe(
      (res: any) => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', res.token);
          this.getUserNameFromToken();
        }
        this.route.navigateByUrl('/dashboard');
     
      },
      (error) => {
        console.log(error);
        this.toastrNotificationService.showError(error?.error?.message, "Error");
      }
    );
  }

  getUserNameFromToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = JSON.parse(atob(token.split(".")[1]));
          localStorage.setItem('userName', decodedToken.sub);
          localStorage.setItem('email', decodedToken.Email);
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      }
    }
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }
}
