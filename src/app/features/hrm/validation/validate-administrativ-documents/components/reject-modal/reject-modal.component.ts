import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-reject-modal',
  imports: [FormsModule, CommonModule],
  templateUrl: './reject-modal.component.html',
})
export class RejectModalComponent {
  @Input() data: any;
  @Output() refused = new EventEmitter<any>();
  @Output() cancelled = new EventEmitter<void>();

  refuseForm: any = {
    demande: null,
    motif: {
      raison: '',
      dateRefus: new Date(),
      refusePar: 'Nom du RH'
    }
  };

  currentDate = new Date();

  resetForm(): void {
    this.refuseForm = {
      demande: null,
      motif: { raison: '', dateRefus: new Date(), refusePar: 'Nom du RH' }
    };
  }

  // ✅ Fix — on vérifie juste que la raison est remplie
  confirmRefusal(form: NgForm): void {
    if (this.refuseForm.motif.raison && this.refuseForm.motif.raison.trim() !== '') {
      this.refuseForm = {
        demande: this.data,
        motif: {
          raison: this.refuseForm.motif.raison
        }
      };
      this.refused.emit(this.refuseForm);
      this.closeModal();
    }
  }

  closeModal(): void {
    const modalElement = document.getElementById('refuseDemandModal');
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
    this.resetForm();
    this.cancelled.emit();
  }
}