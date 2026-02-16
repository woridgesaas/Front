import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceKpisComponent } from './attendance-kpis.component';

describe('AttendanceKpisComponent', () => {
  let component: AttendanceKpisComponent;
  let fixture: ComponentFixture<AttendanceKpisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceKpisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceKpisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
