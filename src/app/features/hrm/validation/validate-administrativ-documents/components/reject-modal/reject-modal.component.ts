import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-reject-modal',
  imports: [FormsModule,CommonModule],
  templateUrl: './reject-modal.component.html',
})
export class RejectModalComponent {
  @Input() data:any;
  @Output() refused = new EventEmitter<any>();
  @Output() cancelled = new EventEmitter<void>();

  // Form data
  refuseForm:any={
    demande:null,
    motif: {
        raison:'',
        dateRefus: new Date(),
        refusePar: 'Nom du RH'
      }

  }
  currentDate = new Date();

  // Réinitialiser le formulaire
  resetForm(): void {

    this.refuseForm = { demande: null, motif: { raison: '', dateRefus: new Date(), refusePar: 'Nom du RH' } };

  }

  // sumbitedForm
  confirmRefusal(form:NgForm): void {
    if(form.valid && form.submitted){
      this.refuseForm={
        demande:this.data,
        motif:{
          raison:form.value.refusalReason
        }

      }
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
