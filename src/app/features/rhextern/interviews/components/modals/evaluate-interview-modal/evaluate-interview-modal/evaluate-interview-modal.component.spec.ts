import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluateInterviewModalComponent } from './evaluate-interview-modal.component';

describe('EvaluateInterviewModalComponent', () => {
  let component: EvaluateInterviewModalComponent;
  let fixture: ComponentFixture<EvaluateInterviewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluateInterviewModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluateInterviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
