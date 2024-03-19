import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'] // Changed styleUrl to styleUrls
})
export class SidenavComponent {
  @Input() sideNavStatus:boolean=false;
  list=[
    {
      number:'1',
      name:'Dashboard',
      icon: 'fa-solid fa-chart-line',
    },
    {
      number:'2',
      name:'Appointment',
      icon: 'fa-solid fa-user',
    },
  ];
}
