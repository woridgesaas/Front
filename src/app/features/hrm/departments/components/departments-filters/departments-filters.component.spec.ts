import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentsFiltersComponent } from './departments-filters.component';

describe('DepartmentsFiltersComponent', () => {
  let component: DepartmentsFiltersComponent;
  let fixture: ComponentFixture<DepartmentsFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentsFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
