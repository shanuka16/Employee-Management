export class EmployeeModel {
  employeeId: number;
  name: string;
  contactNo: number;
  email: string;
  city: string;
  state: string;
  pinCode: string;
  address: string;
  designationId: number;
  role?: string;
  password?: string;

  constructor() {
    this.employeeId = 0;
    this.name = '';
    this.contactNo = 0;
    this.email = '';
    this.city = '';
    this.state = '';
    this.pinCode = '';
    this.address = '';
    this.designationId = 0;
    this.role = '';
    this.password = '';
  }
}

export interface IEmployeeListModel {
  employeeId: number;
  name: string;
  contactNo: number;
  email: string;
  city: string;
  state: string;
  pinCode: string;
  address: string;
  designationId: number;
  designationName: string;
  departmentName: string;
  role: string | null;
  createdDate: string;   // ISO date from API
  modifiedDate: string;  // ISO date from API
}

