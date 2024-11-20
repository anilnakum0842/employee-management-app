import { TestBed } from '@angular/core/testing';

import { EmployeeStateService } from '../_services/employee-state.service';

describe('EmployeeStateService', () => {
  let service: EmployeeStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
