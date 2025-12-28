import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayFiltersComponent } from './holiday-filters.component';

describe('HolidayFiltersComponent', () => {
  let component: HolidayFiltersComponent;
  let fixture: ComponentFixture<HolidayFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HolidayFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HolidayFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
