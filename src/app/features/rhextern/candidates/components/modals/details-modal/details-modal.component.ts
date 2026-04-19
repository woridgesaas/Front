import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateDetailResponse, STATUS_CONFIG } from '../../../models/candidate.model';

@Component({
  selector: 'app-details-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-modal.component.html'
})
export class DetailsModalComponent {
  @Input() candidate: CandidateDetailResponse | null = null;
  @Input() isOpen = false;
  @Output() close      = new EventEmitter<void>();
  @Output() viewCV     = new EventEmitter<CandidateDetailResponse>();
  @Output() downloadCV = new EventEmitter<CandidateDetailResponse>();

  statusConfig = STATUS_CONFIG;

  onClose():      void { this.close.emit(); }
  onViewCV():     void { if (this.candidate) this.viewCV.emit(this.candidate); }
  onDownloadCV(): void { if (this.candidate) this.downloadCV.emit(this.candidate); }

  getInitials(name: string): string {
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  }
}
