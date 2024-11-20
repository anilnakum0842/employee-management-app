import { Component,Input  } from '@angular/core';
import { Employee, EmployeeStateService } from 'src/app/_services/employee-state.service';
import * as $ from "jquery";

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent {
  positionList = [
    {id:'Product Designer',name:'Product Designer'},
    {id:'Flutter Devloper',name:'Flutter Devloper'},
    {id:'QA Tester',name:'QA Tester'},
    {id:'Product Owner',name:'Product Owner'}
  ];
  @Input() employee: Employee = {
    id: 0,
    name: '',
    position: '',
    dateOfJoining: '',
    toDate:''
  };

  constructor(public employeeState: EmployeeStateService) {}

  getMinDate(){
    let minDate = new Date(this.employee.dateOfJoining);
    return minDate;
  }

  // Save or update the employee
  saveEmployee() {
    if (this.employee.id === 0) {
      this.employee.id = Date.now(); // Generate a unique ID
      this.employeeState.addEmployee(this.employee);
    } else {
      this.employeeState.updateEmployee(this.employee);
    }
    
    this.employeeState.closeForm();
    // Reset the form
    setTimeout(() => {
      this.reSetForm();
    }, 1000);
  }

  reSetForm(){
    this.employee = { id: 0, name: '', position: '', dateOfJoining: '',toDate:'' };
  }
}
