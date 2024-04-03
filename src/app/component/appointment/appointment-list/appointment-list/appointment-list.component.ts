import {Component, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppointmentComponent } from '../../appointment/appointment.component';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css'
})
export class AppointmentListComponent {
constructor(public dialog: MatDialog){}
deleteAppointment: any;
editAppointment(_t59: any) {
throw new Error('Method not implemented.');
}
  displayedColumns = ['doctor', 'fees', 'symtoms', 'date','time','note', 'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openAppointmentForm()
  {
    this.dialog.open(AppointmentComponent);
  }
  
}
export interface Element {
  doctor: string;
  fees: number;
  symtoms: string;
  date: string;
  time:string;
  note:string;
  edit?: boolean; // Optional property for edit functionality
  delete?: boolean; 
}

const ELEMENT_DATA: Element[] = [
  {doctor: "test", fees: 30, symtoms: "testSymtoms", date:"32/1/2024", time:"9 am",note:"thanksYou",edit:true,delete:true},
];