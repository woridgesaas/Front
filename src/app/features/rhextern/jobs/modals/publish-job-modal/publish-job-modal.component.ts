import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobsInfo, Plateforme } from '../../models/jobs.model';

/**
 * Modal pour publier une offre sur des plateformes
 */
@Component({
  selector: 'app-publish-job-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './publish-job-modal.component.html',
  styles: [`
    .modal.show { display: block !important; }
    .modal-backdrop { background-color: rgba(0,0,0,0.5); }
  `]
})
export class PublishJobModalComponent {
  @Input() isVisible = false;
  @Input() job!: JobsInfo;
  @Input() plateformes: Plateforme[] = [];
  
  @Output() closed = new EventEmitter<void>();
  @Output() published = new EventEmitter<JobsInfo>();
  @Output() platformToggled = new EventEmitter<Plateforme>();

  close(): void {
    this.closed.emit();
  }

  publish(): void {
    this.published.emit(this.job);
  }

  togglePlateforme(plateforme: Plateforme): void {
    this.platformToggled.emit(plateforme);
  }
}