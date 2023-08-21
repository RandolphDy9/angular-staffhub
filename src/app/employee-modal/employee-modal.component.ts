import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../service/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.scss'],
})
export class EmployeeModalComponent implements OnInit {
  employeeForm: FormGroup;

  departments: string[] = [
    'Engineering',
    'Quality Assurance',
    'Business Analysts',
    'Project Manager',
    'Human Resource',
  ];

  constructor(
    private _fb: FormBuilder,
    private _http: EmployeeService,
    private _dialogRef: MatDialogRef<EmployeeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService
  ) {
    this.employeeForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dateOfBirth: '',
      gender: '',
      companyName: '',
      department: '',
      yearsOfExperience: '',
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.employeeForm.patchValue(this.data);
    }
  }

  onSubmitForm() {
    console.log(this.employeeForm.getRawValue());

    if (this.data) {
      this._http
        .updateEmployee(this.employeeForm.getRawValue(), this.data.id)
        .subscribe({
          next: () => {
            this.toastr.success('Employee has been updated!', 'Success!');
            this._dialogRef.close(true);
          },
          error: (error) => {
            this.toastr.error(error, 'Oh no!');
          },
        });
    } else {
      if (this.employeeForm.valid) {
        this._http.addEmployee(this.employeeForm.getRawValue()).subscribe({
          next: () => {
            this.toastr.success('New employee has been created!', 'Success!');
            this._dialogRef.close(true);
          },
          error: (error) => {
            this.toastr.error(error, 'Oh no!');
          },
        });
      }
    }
  }

  closeDialog() {
    this._dialogRef.close();
  }
}
