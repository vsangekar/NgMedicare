import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/authservice.service';

@Injectable({
  providedIn: 'root'
})
export class RouteguardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      // Redirect to login page if not logged in
      this.router.navigateByUrl('/auth');
      return false;
    }
  }
}
