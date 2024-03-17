import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
@Input() sideNavStatus:boolean=false;
list=[
  {
    number:'1',
    name:'home',
    icon: 'fa-solid fa-house',
  },
  {
    number:'2',
    name:'Analytics',
    icon: 'fa-solid fa-chart-line',
  },
];
}
