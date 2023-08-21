import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Employee {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  companyName: string;
  department: string;
  yearsOfExperience: number;
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private _http: HttpClient) {}

  addEmployee(data: Employee): Observable<Employee> {
    return this._http.post<Employee>('http://localhost:3000/employees', data);
  }

  getEmployeeList(): Observable<Employee[]> {
    return this._http.get<Employee[]>('http://localhost:3000/employees');
  }

  getEmployee(id: string): Observable<Employee> {
    return this._http.get<Employee>(`http://localhost:3000/employees/${id}`);
  }

  updateEmployee(data: Employee, id: string): Observable<Employee> {
    return this._http.put<Employee>(`http://localhost:3000/employees/${id}`, data);
  }

  deleteEmployee(id: string): Observable<Employee> {
    return this._http.delete<Employee>(`http://localhost:3000/employees/${id}`);
  }
}
