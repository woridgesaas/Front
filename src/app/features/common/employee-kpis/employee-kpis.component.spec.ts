import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeKpisComponent } from './employee-kpis.component';

describe('EmployeeKpisComponent', () => {
  let component: EmployeeKpisComponent;
  let fixture: ComponentFixture<EmployeeKpisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeKpisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeKpisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
