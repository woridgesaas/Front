import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewsPlanningComponent } from './interviews-planning.component';

describe('InterviewsPlanningComponent', () => {
  let component: InterviewsPlanningComponent;
  let fixture: ComponentFixture<InterviewsPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterviewsPlanningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterviewsPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
