import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningThresholdsModalComponent } from './warning-thresholds-modal.component';

describe('WarningThresholdsModalComponent', () => {
  let component: WarningThresholdsModalComponent;
  let fixture: ComponentFixture<WarningThresholdsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarningThresholdsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarningThresholdsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
