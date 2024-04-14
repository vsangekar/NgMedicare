import {Component, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppointmentComponent } from '../../appointment/appointment.component';
import { CreateAppointmentService } from '../../../../services/appointment/appointment/create-appointment.service';
import { response } from 'express';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css'
})
export class AppointmentListComponent {
  dataSource = new MatTableDataSource<Element>();
constructor(public dialog: MatDialog, private getAppoiment: CreateAppointmentService){
  debugger;
 this.dataSource =new MatTableDataSource<Element>();
 this.getAppointmentData();
}
deleteAppointment: any;
editAppointment(_t59: any) {
throw new Error('Method not implemented.');
}
  displayedColumns = ['doctor', 'fees', 'symtoms', 'date','time','note', 'actions'];
  

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

  getAppointmentData() {
    debugger;
    this.getAppoiment.getAppointment().subscribe((response: any) => {
      this.dataSource.data = response;
      console.log(response);
    });
    
  }
  
}
export interface Element {
  doctor: string;
  fees: number;
  symtoms: string;
  date: string;
  time:string;
  note:string;
  edit?: boolean; 
  delete?: boolean; 
}
