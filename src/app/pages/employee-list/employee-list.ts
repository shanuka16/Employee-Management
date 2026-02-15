import { Component, inject, OnInit, signal } from '@angular/core';
import { IEmployeeListModel } from '../../models/Employee.model';
import { EmployeeService } from '../../services/employee-service';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employee-list',
   standalone: true,
  imports: [RouterLink,DatePipe],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList implements OnInit{

  employeeList = signal<IEmployeeListModel[]>([])
  empSrv = inject(EmployeeService);

  ngOnInit(): void {
    this.getAllEmpl();
  }

  getAllEmpl(){
    this.empSrv.getAllEmployee().subscribe({
      next: (res:IEmployeeListModel[])=>{
        this.employeeList.set(res);
      }
    })
  }

}
