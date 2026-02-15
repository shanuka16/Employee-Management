import { Component, inject, signal, OnInit } from '@angular/core';
import { DepartmentModel, DesignationListModel, DesignationModel } from '../../models/Department.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Master } from '../../services/master';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-designation',
  imports: [ReactiveFormsModule, AsyncPipe, CommonModule],
  templateUrl: './designation.html',
  styleUrl: './designation.css',
})
export class Designation implements OnInit {

  private fb = inject(FormBuilder);
  private designationService = inject(Master);
  private masterService = inject(Master);

  designationForm!: FormGroup;
  private designationSubject = new BehaviorSubject<DesignationListModel[]>([]);
  $designationList: Observable<DesignationListModel[]> = this.designationSubject.asObservable();
  departmentList: DepartmentModel[] = [];

  isEdit: boolean = false;
  isloading = signal(false);

  ngOnInit(): void {
    this.createForm();
    this.loadDepartments();
    this.loadDesignations();
  }

  // FORM
  createForm() {
    this.designationForm = this.fb.group({
      designationId: [0],
      departmentId: ['', Validators.required],
      designationName: ['', Validators.required]
    });
  }

  // LOAD DEPARTMENTS
  loadDepartments() {
    this.masterService.getAllDept().subscribe({
      next: (res: any) => this.departmentList = res,
      error: err => console.error(err)
    });
  }

  // LOAD DESIGNATIONS
  loadDesignations() {
    this.designationService.getAllDesignations().subscribe({
      next: (data) => {
        this.designationSubject.next(data);
        this.isloading.set(false);
      },
      error: (err) => {
        console.error('Error loading designations:', err);
        this.isloading.set(false);
      }
    });
  }

  // SAVE / UPDATE
  onSubmit() {
    if (this.designationForm.invalid) return;
    const obj: DesignationModel = this.designationForm.value;
    this.isloading.set(true);
    if (obj.designationId && obj.designationId > 0) {
      this.designationService.onUpdateDesignation(obj).subscribe({
        next: () => {
          this.loadDesignations();
          this.resetForm();
        },
        error: (err) => {
          console.error('Update failed:', err);
          this.isloading.set(false);
                this.loadDesignations();
                this.resetForm();
        }
      });
    } else {
      this.designationService.saveDesignation(obj).subscribe({
        next: () => {
          this.loadDesignations();
          this.resetForm();
        },
        error: (err) => {
          console.error('Save failed:', err);
          this.isloading.set(false);
          this.loadDesignations();
                this.resetForm();
        }
      });
    }     
  }

  // EDIT
  onEdit(row: DesignationModel) {
    this.isEdit = true;
    this.designationForm.patchValue({
      designationId: row.designationId,
      departmentId: row.departmentId,
      designationName: row.designationName
    });
  }
  // DELETE
  onDelete(id: number) {
    if (!confirm('Are you sure you want to delete this designation?')) return;
    this.isloading.set(true);
    this.designationService.onDeleteDesignation(id).subscribe({
      next: () => {
        alert('Designation deleted successfully');
        this.loadDesignations();
        this.resetForm();
      },
      error: (err) => {
        console.error('Delete failed:', err);
        this.isloading.set(false);
        this.resetForm();
      }
    });
  }


  // RESET
  resetForm() {
    this.isEdit = false;
    this.designationForm.reset({ designationId: 0 });
  }


}
