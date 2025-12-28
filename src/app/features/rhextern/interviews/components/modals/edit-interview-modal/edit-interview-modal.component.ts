
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Interview } from '../../../models/interview.model';

@Component({
  selector: 'app-edit-interview-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-interview-modal.component.html',
  styleUrls: ['./edit-interview-modal.component.scss']
})
export class EditInterviewModalComponent {
  @Input() modalId = 'edit_interview_modal';
  @Input() interview: Interview | null = null;

  @Output() onUpdate = new EventEmitter<Interview>();
  @Output() onCancel = new EventEmitter<void>();

  update(): void {
    if (this.interview) {
      this.onUpdate.emit(this.interview);
    }
  }

  cancel(): void {
    this.onCancel.emit();
  }
}