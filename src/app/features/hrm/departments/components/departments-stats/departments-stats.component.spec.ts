import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentsStatsComponent } from './departments-stats.component';

describe('DepartmentsStatsComponent', () => {
  let component: DepartmentsStatsComponent;
  let fixture: ComponentFixture<DepartmentsStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentsStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentsStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
