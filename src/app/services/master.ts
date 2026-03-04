import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DepartmentModel, DesignationListModel, DesignationModel } from '../models/Department.model';

@Injectable({
  providedIn: 'root',
})
export class Master {
  
  //apiUrl: string = 'https://localhost:7168/api/';
  // make sure the protocol is included; without it the browser will treat the URL as relative
  apiUrl: string = 'https://employeemanagementsystembackendapi-e5dygyamb3bpc4c6.canadacentral-01.azurewebsites.net/api/';
  http = inject(HttpClient);

  /*Department services start*/

  getAllDept() {
    // specify the expected response type for better type safety
    return this.http.get<DepartmentModel[]>(
      this.apiUrl + "DepartmentMaster/GetAllDepartments"
    );
  }

  saveDept(Obj: DepartmentModel) {
    return this.http.post(this.apiUrl+"DepartmentMaster/AddDepartment", Obj);
  }

  onUpdateDept(Obj: DepartmentModel) {
    return this.http.put(this.apiUrl+"DepartmentMaster/UpdateDepartment", Obj);
  }

  onDeltDept(deptId: number) {
    return this.http.delete(this.apiUrl+"DepartmentMaster/DeleteDepartment/"+deptId);
  }


  /*Designation services start*/

   getAllDesignations(): Observable<DesignationListModel[]> {
    return this.http.get<DesignationListModel[]>(
      this.apiUrl + 'DesignationMaster/'
    );
  }

  // SAVE DESIGNATION
saveDesignation(obj: DesignationModel) {debugger;
    return this.http.post(
      this.apiUrl + 'DesignationMaster',
      obj
    );debugger;
  }


  // UPDATE DESIGNATION
  onUpdateDesignation(obj: DesignationModel) {debugger;
    return this.http.put(
      this.apiUrl + 'DesignationMaster/' + obj.designationId,
      obj
    );
  }

  // DELETE DESIGNATION
  onDeleteDesignation(designationId: number) {
    return this.http.delete(
      this.apiUrl + 'DesignationMaster/' + designationId
    );
  }

}