
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Interview, getTypeClass } from '../../../models/interview.model';

@Component({
  selector: 'app-detail-interview-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-interview-modal.component.html',
  styleUrls: ['./detail-interview-modal.component.scss']
})
export class DetailInterviewModalComponent {
  @Input() modalId = 'detail_interview_modal';
  @Input() interview: Interview | null = null;

  @Output() onClose = new EventEmitter<void>();

  close(): void {
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

  getTypeClass(type: any): string {
    return getTypeClass(type);
  }

  getScoreColor(score: number): string {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-danger';
  }
}