import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-experience-step',
  templateUrl: './experience-step.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BsDatepickerModule, MatSelectModule]
})
export class ExperienceStepComponent {
  @Input() experienceArray!: FormArray;

  constructor(private fb: FormBuilder) {}

  // Getter pour avoir le bon type
  get experienceControls(): FormGroup[] {
    return this.experienceArray.controls as FormGroup[];
  }

  addExperience(): void {
    this.experienceArray.push(this.createExperienceGroup());
  }

  removeExperience(index: number): void {
    if (this.experienceArray.length > 1) {
      this.experienceArray.removeAt(index);
    }
  }

  private createExperienceGroup(): FormGroup {
    return this.fb.group({
      jobTitle: ['', Validators.required],
      company: ['', Validators.required],
      industry: [''],
      location: [''],
      startDate: ['', Validators.required],
      endDate: [''],
      isCurrent: [false]
    });
  }
}