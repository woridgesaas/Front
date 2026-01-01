import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalHeaderComponent } from '../../../../../common/modal-header/modal-header.component';
import { ModalFooterComponent } from '../../../../../common/modal-footer/modal-footer.component';
import { FormErrorMessageComponent } from '../../../../../common/form-error-message/form-error-message.component';
import { AlertInformationComponent } from '../../../../../common/alert-information/alert-information.component';

@Component({
  selector: 'app-annual-leave-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalHeaderComponent,
    ModalFooterComponent,
    FormErrorMessageComponent,
    AlertInformationComponent,
  ],
  templateUrl: './annual-leave-modal.component.html',
})
export class AnnualLeaveModalComponent {
  @Input() open = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<number>();

  annualLeaveDays: number | null = 18;
  touched = false;

  get isInvalid(): boolean {
    return this.annualLeaveDays === null || this.annualLeaveDays < 0;
  }

  getErrorMessage(): string {
    if (this.annualLeaveDays === null) {
      return 'Le solde de congé annuel ne peut pas être vide.';
    }

    if (this.annualLeaveDays < 0) {
      return 'Le solde de congé annuel ne peut pas être négatif.';
    }

    return '';
  }

  submit(): void {
    this.touched = true;

    if (this.isInvalid) {
      return;
    }

    this.save.emit(this.annualLeaveDays as number);
    this.close.emit();
  }
}
