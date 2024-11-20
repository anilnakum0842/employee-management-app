import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { Employee, EmployeeStateService } from 'src/app/_services/employee-state.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  @Output() editEmployee = new EventEmitter<Employee>();

  constructor(public employeeState: EmployeeStateService) {}

  ngOnInit(): void {
    
  }

  // Delete an employee
  deleteEmployee(id: number) {
    this.employeeState.deleteEmployee(id);
  }

  onEdit(employee: Employee) {
    this.editEmployee.emit(employee); // Emit selected employee for editing
    this.employeeState.viewForm();
  }
}
