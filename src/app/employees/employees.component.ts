import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeModalComponent } from '../employee-modal/employee-modal.component';
import { EmployeeService } from '../service/employee.service';

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

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  employeeList: Employee[] = [];
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dateOfBirth',
    'gender',
    'companyName',
    'department',
    'yearsOfExperience',
    'action'
  ];
  dataSource: MatTableDataSource<Employee>;

  constructor(private _dialog: MatDialog, private _http: EmployeeService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getEmployeeList();
  }

  getEmployeeList() {
    this._http.getEmployeeList()
    .subscribe({
      next: (response) => {
        console.log(response);
        this.employeeList = response;
        this.dataSource = new MatTableDataSource(this.employeeList);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  onAddEmployee() {
    const dialogRef = this._dialog.open(EmployeeModalComponent);
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.getEmployeeList();
        }
      }
    })
  }

  onUpdate(employeeData: Employee) {
    const dialogRef = this._dialog.open(EmployeeModalComponent, {
      data: employeeData
    });
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        console.log(result);
        if (result) {
          this.getEmployeeList();
        }
      }
    })
  }

  onDelete(id: string) {
    this._http.deleteEmployee(id)
    .subscribe({
      next: () => {
        alert('Deleted');
        this.getEmployeeList();
      },
      error: () => {

      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}