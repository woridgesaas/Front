
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Interview } from '../../../models/interview.model';

@Component({
  selector: 'app-cancel-interview-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cancel-interview-modal.component.html',
  styleUrls: ['./cancel-interview-modal.component.scss']
})
export class CancelInterviewModalComponent {
  @Input() modalId = 'cancel_interview_modal';
  @Input() interview: Interview | null = null;

  @Output() onConfirm = new EventEmitter<string>();
  @Output() onClose = new EventEmitter<void>();

  raison = '';

  confirm(): void {
    this.onConfirm.emit(this.raison);
    this.raison = '';
  }

  close(): void {
    this.raison = '';
    this.onClose.emit();
  }

  formatDate(date: string): string {
    const d = new Date(date);
    return d.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}