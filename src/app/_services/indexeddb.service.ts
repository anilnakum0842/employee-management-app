import { Injectable } from '@angular/core';
import { openDB, DBSchema } from 'idb';

interface EmployeeDB extends DBSchema {
  employees: {
    key: number;
    value: {
      id: number;
      name: string;
      position: string;
      dateOfJoining: string;
      toDate:string;
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class IndexedDBService {
  private dbPromise = openDB<EmployeeDB>('employee-db', 1, {
    upgrade(db) {
      db.createObjectStore('employees', { keyPath: 'id', autoIncrement: true });
    },
  });

  async addEmployee(employee: { id: number; name: string; position: string; dateOfJoining: string; toDate:string }) {
    const db = await this.dbPromise;
    return db.add('employees', employee);
  }

  async getEmployees() {
    const db = await this.dbPromise;
    return db.getAll('employees');
  }

  async updateEmployee(employee: { id: number; name: string; position: string; dateOfJoining: string; toDate:string }) {
    const db = await this.dbPromise;
    await db.put('employees', employee);
  }

  async deleteEmployee(id: number) {
    const db = await this.dbPromise;
    await db.delete('employees', id);
  }
}
