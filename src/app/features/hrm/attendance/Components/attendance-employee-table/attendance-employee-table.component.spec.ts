import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceEmployeeTableComponent } from './attendance-employee-table.component';

describe('AttendanceEmployeeTableComponent', () => {
  let component: AttendanceEmployeeTableComponent;
  let fixture: ComponentFixture<AttendanceEmployeeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceEmployeeTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceEmployeeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
