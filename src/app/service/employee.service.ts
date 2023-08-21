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
    return this._http.post<Employee>('https://raw.githubusercontent.com/RandolphDy9/angular-staffhub/main/db.json', data);
  }

  getEmployeeList(): Observable<Employee[]> {
    return this._http.get<Employee[]>('https://raw.githubusercontent.com/RandolphDy9/angular-staffhub/main/db.json');
  }

  getEmployee(id: string): Observable<Employee> {
    return this._http.get<Employee>(`https://raw.githubusercontent.com/RandolphDy9/angular-staffhub/main/db.json${id}`);
  }

  updateEmployee(data: Employee, id: string): Observable<Employee> {
    return this._http.put<Employee>(`https://raw.githubusercontent.com/RandolphDy9/angular-staffhub/main/db.json/${id}`, data);
  }

  deleteEmployee(id: string): Observable<Employee> {
    return this._http.delete<Employee>(`https://raw.githubusercontent.com/RandolphDy9/angular-staffhub/main/db.json/${id}`);
  }
}
