import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RhPayrollComponent } from './rh-payroll.component';

describe('RhPayrollComponent', () => {
  let component: RhPayrollComponent;
  let fixture: ComponentFixture<RhPayrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RhPayrollComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RhPayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
