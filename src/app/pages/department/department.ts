import { Component, inject, OnInit } from '@angular/core';
import { DepartmentModel } from '../../models/Department.model';
import { FormsModule } from '@angular/forms';
import { Master } from '../../services/master';

@Component({
  selector: 'app-department',
  imports: [FormsModule],
  templateUrl: './department.html',
  styleUrl: './department.css',
})
export class Department implements OnInit{

  newDepOb: DepartmentModel = new DepartmentModel();
  masterService = inject(Master);
  deptList: DepartmentModel[] = [];

  ngOnInit(): void {
    this.getAllDepartments();
  }

  onSaveDept() {
    this.masterService.saveDept(this.newDepOb).subscribe({
      next:(result:any)=> {
          alert("Department Saved Successfully");
          this.getAllDepartments();
      },error:(error)=>{
          alert("Error while saving department"+  error.error.Message);
      }
    
    })
  }
  getAllDepartments() {
    this.masterService.getAllDept().subscribe({
      next: (result: DepartmentModel[]) => {
        console.log('departments received', result);
        this.deptList = result;
      },
      error: (err) => {
        console.error('failed to load departments', err);
        alert('Unable to fetch departments: ' + (err.message || err.status));
      }
    });
  }

  onEditDept(dept: DepartmentModel) {
    
    const stringData = JSON.stringify(dept);
    const parseData = JSON.parse(stringData);
    this.newDepOb = parseData;
  }

  onReset() {
    this.newDepOb = new DepartmentModel();
  } 

  onUpdateDept() {
    this.masterService.onUpdateDept(this.newDepOb).subscribe({
      next:(result:any)=> {
          alert("Department Updated Successfully");
          this.getAllDepartments();
      },error:(error)=>{
          alert("Error while updating department"+  error.error.Message);
      }
    })
  }

  onDeltDept(deptId: number) {
    const confirmDelete = confirm("Are you sure you want to delete this department?");
    if (confirmDelete) {
       this.masterService.onDeltDept(deptId).subscribe({
      next:(result:any)=> {
          alert("Department Deleted Successfully");
          this.getAllDepartments();
      },error:()=>{
          alert("Error while deleting department");
      }
    })
    }
   
  }

}