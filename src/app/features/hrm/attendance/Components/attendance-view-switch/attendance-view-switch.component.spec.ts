import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceViewSwitchComponent } from './attendance-view-switch.component';

describe('AttendanceViewSwitchComponent', () => {
  let component: AttendanceViewSwitchComponent;
  let fixture: ComponentFixture<AttendanceViewSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceViewSwitchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceViewSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
