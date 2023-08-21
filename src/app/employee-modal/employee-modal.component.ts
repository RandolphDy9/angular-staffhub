import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../service/employee.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.scss']
})
export class EmployeeModalComponent implements OnInit {

  employeeForm: FormGroup;

  departments: string[] = [
    'Engineering',
    'Quality Assurance',
    'Business Analysts',
    'Project Manager',
    'Human Resource'
  ];

  constructor(private _fb: FormBuilder, private _http: EmployeeService, private _dialogRef: DialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.employeeForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dateOfBirth: '',
      gender: '',
      companyName: '',
      department: '',
      yearsOfExperience: ''
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
      this._http.updateEmployee(this.employeeForm.getRawValue(), this.data.id)
      .subscribe({
        next: () => {
          alert('Employee Updated!');
          this._dialogRef.close(true);
        },
        error: (error) => {
          console.log(error);
        }
      })
    } else {
      if (this.employeeForm.valid) {
        this._http.addEmployee(this.employeeForm.getRawValue())
        .subscribe({
          next: () => {
            alert('Employee Created!');
            this._dialogRef.close(true);
          },
          error: (error) => {
            console.log(error);
          }
        })
      }
    }
  }

  closeDialog() {
    this._dialogRef.close();
  }

}
