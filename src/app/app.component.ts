import { Component } from '@angular/core';

import { Employee, EmployeeStateService } from 'src/app/_services/employee-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'employee-management-app';

  selectedEmployee: Employee = {
    id: 0,
    name: '',
    position: '',
    dateOfJoining: '',
    toDate:''
  };
  constructor(public employeeState: EmployeeStateService) {}

  onEditEmployee(employee: Employee) {
    this.selectedEmployee = { ...employee }; // Load the selected employee into the form
  }
  
}
