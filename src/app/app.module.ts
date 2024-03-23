import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthComponent } from './component/auth/auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './component/register/register.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HeaderComponent } from './component/header/header.component';
import { SidenavComponent } from './component/sidenav/sidenav.component';
import { AuthLayoutComponent } from './component/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './component/main-layout/main-layout.component';
import { DashboardInterceptor } from './intercepter/dashboard/dashboard.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';



@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegisterComponent,
    DashboardComponent,
    HeaderComponent,
    SidenavComponent,
    AuthLayoutComponent,
    MainLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground:true,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DashboardInterceptor,
      multi: true
    },
    provideHttpClient(withFetch()) // Add withFetch() here
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
