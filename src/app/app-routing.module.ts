import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './component/auth/auth.component';
import { RegisterComponent } from './component/register/register.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AuthLayoutComponent } from './component/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './component/main-layout/main-layout.component';
import { RouteguardService } from './services/gaurd/routeguard.service';
import { AppointmentComponent } from './component/appointment/appointment/appointment.component';


const routes: Routes = [
  {
     path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'auth', pathMatch: 'full' },
      { path: 'auth', component: AuthComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [RouteguardService] },
      { path: 'appointment', component: AppointmentComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
