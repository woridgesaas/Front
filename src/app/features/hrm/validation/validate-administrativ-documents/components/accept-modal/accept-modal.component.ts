import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RhDocumentDemande } from '../../../../../../shared/models/models';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-accept-modal',
  imports: [FormsModule,DatePipe],
  templateUrl: './accept-modal.component.html',
  styleUrl: './accept-modal.component.scss',
})
export class AcceptModalComponent {
  @Input() data: RhDocumentDemande | null = null;
  @Output() accepted = new EventEmitter<any>();
  @Output() cancelled = new EventEmitter<void>();
  validator: string = 'rh';

  currentDate = new Date();

  // Ouvrir le modal
  openModal(): void {
    const modalElement = document.getElementById('acceptDemandModal');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  // Confirmer l'acceptation
  confirmAcceptance(): void {
    if (!this.data) return;

    const acceptanceData = {
      demande: this.data,
      traitement: {
        validateur: this.validator,
        dateTraitement: new Date(),
        traitePar: 'Nom du RH'
      }
    };

    // Emition accept
    this.accepted.emit(acceptanceData);

    // Fermer le modal
    this.closeModal();
  }

  // Fermer le modal
  closeModal(): void {
    const modalElement = document.getElementById('acceptDemandModal');
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
    this.cancelled.emit();
  }

  // Réinitialiser les paramètres
  resetSettings(): void {
    this.validator = 'rh';

  }
}
