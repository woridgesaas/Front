import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceHistoryHeaderComponent } from './attendance-history-header.component';

describe('AttendanceHistoryHeaderComponent', () => {
  let component: AttendanceHistoryHeaderComponent;
  let fixture: ComponentFixture<AttendanceHistoryHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceHistoryHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceHistoryHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
