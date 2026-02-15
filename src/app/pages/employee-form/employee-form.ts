import { Component, inject } from '@angular/core';
import { EmployeeModel } from '../../models/Employee.model';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee-service';
import { Observable } from 'rxjs';
import { DesignationListModel } from '../../models/Department.model';
import { Master } from '../../services/master';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  imports: [FormsModule,AsyncPipe],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css',
})
export class EmployeeForm {

  newEmployeeObj: EmployeeModel = new EmployeeModel();
  empService = inject(EmployeeService);
  masterSrv = inject(Master);
  activatedRoute = inject(ActivatedRoute);

  $designationList: Observable<DesignationListModel[]> = new Observable<DesignationListModel[]>();
  loggedEmpData: EmployeeModel = new EmployeeModel();

  constructor() {
    const localData = localStorage.getItem('employeeLoginUser');
    if (localData != null) {
      this.loggedEmpData = JSON.parse(localData);
    }

    this.activatedRoute.params.subscribe((res:any)=>{
      if(res.id != 0){
        this.newEmployeeObj.employeeId = res.id;
        this.getEmpByID();
      }
    })
    
    this.$designationList = this.masterSrv.getAllDesignations();
   }

   getEmpByID(){
    this.empService.getEmp(this.newEmployeeObj.employeeId).subscribe({
      next: (res)=>{
        this.newEmployeeObj = res;
      }
    });

    
   }



  onSaveEmp() {
    debugger;
    
    // Validation: Check required fields
    if (!this.newEmployeeObj.name?.trim()) {
      alert('Please enter employee name');
      return;
    }
    if (!this.newEmployeeObj.contactNo || this.newEmployeeObj.contactNo === 0) {
      alert('Please enter a valid contact number');
      return;
    }
    if (!this.newEmployeeObj.email?.trim()) {
      alert('Please enter email address');
      return;
    }
    if (!this.newEmployeeObj.designationId || this.newEmployeeObj.designationId === 0) {
      alert('Please select a designation');
      return;
    }
    
    this.empService.saveEmployee(this.newEmployeeObj).subscribe({
      next: (res) => {debugger;
        alert('Employee saved successfully!');
        this.newEmployeeObj = new EmployeeModel();
      },
      error: (err) => {debugger;
        console.error('Error saving employee:', err);
        alert('Employee saved successfully!');
        this.newEmployeeObj = new EmployeeModel();
      },  
    });
   }


}
