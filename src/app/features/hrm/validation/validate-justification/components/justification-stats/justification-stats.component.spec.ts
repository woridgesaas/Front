import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JustificationStatsComponent } from './justification-stats.component';

describe('JustificationStatsComponent', () => {
  let component: JustificationStatsComponent;
  let fixture: ComponentFixture<JustificationStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JustificationStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JustificationStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
