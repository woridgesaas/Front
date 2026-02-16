import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResignationStatsComponent } from './resignation-stats.component';

describe('ResignationStatsComponent', () => {
  let component: ResignationStatsComponent;
  let fixture: ComponentFixture<ResignationStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResignationStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResignationStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
