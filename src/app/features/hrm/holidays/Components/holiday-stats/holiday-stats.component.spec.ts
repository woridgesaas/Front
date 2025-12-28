import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayStatsComponent } from './holiday-stats.component';

describe('HolidayStatsComponent', () => {
  let component: HolidayStatsComponent;
  let fixture: ComponentFixture<HolidayStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HolidayStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HolidayStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
