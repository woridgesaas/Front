import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-education-step',
  templateUrl: './education-step.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSelectModule]
})
export class EducationStepComponent {
  @Input() educationArray!: FormArray;
  @Input() currentYear: number = new Date().getFullYear();

  constructor(private fb: FormBuilder) {}

  // Getter pour avoir le bon type
  get educationControls(): FormGroup[] {
    return this.educationArray.controls as FormGroup[];
  }

  addEducation(): void {
    this.educationArray.push(this.createEducationGroup());
  }

  removeEducation(index: number): void {
    if (this.educationArray.length > 1) {
      this.educationArray.removeAt(index);
    }
  }

  private createEducationGroup(): FormGroup {
    return this.fb.group({
      degree: ['', Validators.required],
      fieldOfStudy: ['', Validators.required],
      institution: ['', Validators.required],
      city: [''],
      country: ['Maroc'],
      startYear: ['', [Validators.required, Validators.min(1970), Validators.max(this.currentYear)]],
      endYear: ['', [Validators.required, Validators.min(1970), Validators.max(this.currentYear + 10)]],
      grade: ['']
    });
  }
}