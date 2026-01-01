import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalHeaderComponent } from '../../../../../common/modal-header/modal-header.component';
import { ModalFooterComponent } from '../../../../../common/modal-footer/modal-footer.component';
import { FormErrorMessageComponent } from '../../../../../common/form-error-message/form-error-message.component';
import { AlertInformationComponent } from '../../../../../common/alert-information/alert-information.component';

@Component({
  selector: 'app-absence-justification-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalHeaderComponent,
    ModalFooterComponent,
    FormErrorMessageComponent,
    AlertInformationComponent,
  ],
  templateUrl: './absence-justification-modal.component.html',
})
export class AbsenceJustificationModalComponent {
  @Input() open = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<number>();

  justificationDelay = 24;
  touched = false;

  //* Validation
  get isInvalid(): boolean {
    return this.justificationDelay == null || this.justificationDelay <= 0;
  }

  getErrorMessage(): string {
    return 'Le délai doit être supérieur à 0.';
  }

  submit(): void {
    this.touched = true;

    if (this.isInvalid) {
      return;
    }

    this.save.emit(this.justificationDelay);
    this.close.emit();
  }
}
