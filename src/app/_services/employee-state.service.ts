import { Injectable, signal } from '@angular/core';
import { IndexedDBService } from './indexeddb.service';
import * as $ from "jquery";

export interface Employee {
  id: number;
  name: string;
  position: string;
  dateOfJoining: string;
  toDate:string;
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeStateService {
  // Signal to hold the list of employees
  employees = signal<Employee[]>([]);
  currentEmployees = signal<Employee[]>([]);
  previousEmployees = signal<Employee[]>([]);

  constructor(private indexedDBService: IndexedDBService) {
    this.loadEmployees();
  }

  // Load employees from IndexedDB on initialization
  async loadEmployees() {
    const storedEmployees = await this.indexedDBService.getEmployees();
    this.employees.set(storedEmployees);
    this.currentEmployees.set(storedEmployees.filter((employee) => !employee.toDate));
    this.previousEmployees.set(storedEmployees.filter((employee) => employee.toDate));
  }

  // Add a new employee and persist it
  async addEmployee(employee: Employee) {
    const id = await this.indexedDBService.addEmployee(employee);
    employee.id = id; // Use the ID generated by IndexedDB
    this.employees.update((current) => [...current, employee]);
    this.loadEmployees();
  }

  // Update an employee and persist it
  async updateEmployee(updatedEmployee: Employee) {
    await this.indexedDBService.updateEmployee(updatedEmployee);
    this.employees.update((current) =>
      current.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
    );
    this.loadEmployees();
  }

  // Delete an employee and update persistence
  async deleteEmployee(id: number) {
    await this.indexedDBService.deleteEmployee(id);
    this.employees.update((current) => current.filter((emp) => emp.id !== id));
    this.loadEmployees();
  }

  viewForm() {
    $(".add-edit-form").fadeIn(1000);
    window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth"
    });
  }
  closeForm() {
      $(".add-edit-form").fadeOut(800);
  }
}