import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobsInfo } from '../../models/jobs.model';

/**
 * Modal pour modifier une offre existante
 */
@Component({
  selector: 'app-edit-job-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-job-modal.component.html',
  styles: [`
    .modal.show { display: block !important; }
    .modal-backdrop { background-color: rgba(0,0,0,0.5); }
  `]
})
export class EditJobModalComponent {
  @Input() isVisible = false;
  @Input() job!: JobsInfo;
  
  @Output() closed = new EventEmitter<void>();
  @Output() saved = new EventEmitter<JobsInfo>();

  close(): void {
    this.closed.emit();
  }

  save(): void {
    this.saved.emit(this.job);
  }
}