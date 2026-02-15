export class DepartmentModel {
  departmentId: number;
  departmentName: string;
  isActive: string;  

    constructor() {
        this.departmentId = 0;
        this.departmentName = "";
        this.isActive = "false";
    }
}  

export interface DesignationModel{
  designationId: number;
  departmentId: number;
  designationName: string;
}

export interface DesignationListModel{
  designationId: number;
  departmentId: number;
  designationName: string;
  departmentName: string;
}

