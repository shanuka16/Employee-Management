import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EmployeeModel, IEmployeeListModel } from '../models/Employee.model';
import { Observable } from 'rxjs';
import { EmployeeList } from '../pages/employee-list/employee-list';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  
  //apiUrl: string = 'https://localhost:7168/api/';
  
  apiUrl: string = 'https://employeemanagementsystembackendapi-e5dygyamb3bpc4c6.canadacentral-01.azurewebsites.net/api/';
  
  http = inject(HttpClient);

  /*Employee services start*/

  saveEmployee(Obj: EmployeeModel) {
    return this.http.post<any>(this.apiUrl + "EmployeeMaster", Obj);
  }

  getAllEmployee() :Observable<IEmployeeListModel[]> {
    return this.http.get<IEmployeeListModel[]>(this.apiUrl+"EmployeeMaster");
  }

  getEmp(id: number) :Observable<EmployeeModel> {
    return this.http.get<EmployeeModel>(this.apiUrl+"EmployeeMaster/"+id);
  }

}
