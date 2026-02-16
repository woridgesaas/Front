import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceFiltersComponent } from './attendance-filters.component';

describe('AttendanceFiltersComponent', () => {
  let component: AttendanceFiltersComponent;
  let fixture: ComponentFixture<AttendanceFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
