import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit  {
  userEmail: string | null = null; // Initialize userEmail as null or any default value

  constructor() {}

  ngOnInit(): void {
    this.userEmail = localStorage.getItem('userEmail'); // Retrieve userEmail from localStorage
  }
}
