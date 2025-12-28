import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Candidate, STATUS_CONFIG } from '../../../models/candidate.model';

@Component({
  selector: 'app-details-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-modal.component.html'
})
export class DetailsModalComponent {
  @Input() candidate: Candidate | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() viewCV = new EventEmitter<Candidate>();
  @Output() downloadCV = new EventEmitter<Candidate>();

  statusConfig = STATUS_CONFIG;

  onClose(): void {
    this.close.emit();
  }

  onViewCV(): void {
    if (this.candidate) {
      this.viewCV.emit(this.candidate);
    }
  }

  onDownloadCV(): void {
    if (this.candidate) {
      this.downloadCV.emit(this.candidate);
    }
  }
}