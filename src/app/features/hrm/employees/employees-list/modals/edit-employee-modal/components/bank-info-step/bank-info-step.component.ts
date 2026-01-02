import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-bank-info-step',
  templateUrl: './bank-info-step.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSelectModule]
})
export class BankInfoStepComponent {
  @Input() bankInfoGroup!: any;

  isFieldInvalid(fieldName: string): boolean {
    const field = this.bankInfoGroup?.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
}