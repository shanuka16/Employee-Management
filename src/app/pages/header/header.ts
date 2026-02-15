import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { EmployeeModel } from '../../models/Employee.model';

@Component({
  selector: 'app-header',
  imports: [RouterOutlet,NgIf,RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  isCollapsed = false;
  router  = inject(Router);
  loggedEmpData: EmployeeModel = new EmployeeModel();

  constructor() {
    const localData = localStorage.getItem('employeeLoginUser');
    if (localData != null) {
      this.loggedEmpData = JSON.parse(localData);
    }
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  onLogOff() {
    localStorage.removeItem('employeeLoginUser');
    this.router.navigateByUrl('/login');
  }
}
