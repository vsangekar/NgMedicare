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
    this.ngxService.start(); // start foreground spinner of the master loader with 'default' taskId
    // Stop the foreground loading after 5s
    setTimeout(() => {
      this.ngxService.stop(); // stop foreground spinner of the master loader with 'default' taskId
    }, 5000);

    // OR
    this.ngxService.startBackground("do-background-things");
    // Do something here...
    this.ngxService.stopBackground("do-background-things");

    this.ngxService.startLoader("loader-01"); // start foreground spinner of the loader "loader-01" with 'default' taskId
    // Stop the foreground loading after 5s
    setTimeout(() => {
      this.ngxService.stopLoader("loader-01"); // stop foreground spinner of the loader "loader-01" with 'default' taskId
    }, 5000);
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    if (isPlatformBrowser(this.platformId)) {
      this.getUserNameFromToken();
    }
  }

  onSubmit() {
    this.authService.onLogin(this.loginForm.value).subscribe(
      (res: any) => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', res.token);
        }
        this.route.navigateByUrl('/dashboard');
     
      },
      (error) => {
        // Handle error appropriately
        console.error('Error occurred:', error);
        this.toastrNotificationService.showError("Please enter correct Email or Password!", "Error!");
      }
    );
  }

  getUserNameFromToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = JSON.parse(atob(token.split(".")[1]));
          console.log(decodedToken);
          this.userName = decodedToken.Username;
          localStorage.setItem('userName', this.userName);
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      }
    }
  }
}
