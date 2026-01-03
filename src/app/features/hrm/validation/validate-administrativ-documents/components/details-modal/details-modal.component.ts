import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RhDocumentDemande } from '../../../../../../shared/models/models';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-details-modal',
  imports: [FormsModule,CommonModule,DatePipe,RouterLink],
  templateUrl: './details-modal.component.html',
  styleUrl: './details-modal.component.scss',
})
export class DetailsModalComponent {
  @Input() data: RhDocumentDemande | null = null;
  @Output() close = new EventEmitter<void>();


  openModal(): void {
    const modalElement = document.getElementById('demandDetailsModal');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  }


  closeModal(): void {
    const modalElement = document.getElementById('demandDetailsModal');
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
    this.close.emit();
  }

  // Helpers 
  getStatusText(): string {
    const map: Record<string, string> = {
      'pending': 'En attente',
      'in_progress': 'En traitement',
      'ready': 'Prêt',
      'accepted': 'Acceptée',
      'rejected': 'Refusée',
      'cancelled': 'Annulée'
    };
    return map[this.data?.status || ''] || this.data?.status || '';
  }

  getStatusShortText(): string {
    const map: Record<string, string> = {
      'pending': 'ATT',
      'in_progress': 'TRAIT',
      'ready': 'PRÊT',
      'accepted': 'OK',
      'rejected': 'NOK',
      'cancelled': 'ANN'
    };
    return map[this.data?.status || ''] || '';
  }

  getStatusBadgeClass(): string {
    const map: Record<string, string> = {
      'pending': 'bg-warning-subtle text-warning border-warning',
      'in_progress': 'bg-info-subtle text-info border-info',
      'ready': 'bg-primary-subtle text-primary border-primary',
      'accepted': 'bg-success-subtle text-success border-success',
      'rejected': 'bg-danger-subtle text-danger border-danger',
      'cancelled': 'bg-secondary-subtle text-secondary border-secondary'
    };
    return map[this.data?.status || ''] || 'bg-light text-dark border';
  }

  getStatusBgClass(): string {
    const map: Record<string, string> = {
      'pending': 'bg-warning',
      'in_progress': 'bg-info',
      'ready': 'bg-primary',
      'accepted': 'bg-success',
      'rejected': 'bg-danger',
      'cancelled': 'bg-secondary'
    };
    return map[this.data?.status || ''] || 'bg-secondary';
  }

  getDocumentIcon(): string {
    const map: Record<string, string> = {
      'Attestations': 'ti-file-certificate',
      'Contrats': 'ti-file-contract',
      'Bulletins': 'ti-file-invoice',
      'Certificats': 'ti-file-certificate',
      'default': 'ti-file-text'
    };
    return map[this.data?.category || ''] || map['default'];
  }


  // Chronologie et progression
  getLastUpdateDate(): Date {
    return this.data?.processedDate || this.data?.requestDate || new Date();
  }

  printDetails(): void {
    window.print();
  }

  exportDetails(): void {
    console.log('Export details:', this.data);
   
  }
}
