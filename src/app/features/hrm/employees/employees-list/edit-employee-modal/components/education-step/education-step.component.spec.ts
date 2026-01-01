import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationStepComponent } from './education-step.component';

describe('EducationStepComponent', () => {
  let component: EducationStepComponent;
  let fixture: ComponentFixture<EducationStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
