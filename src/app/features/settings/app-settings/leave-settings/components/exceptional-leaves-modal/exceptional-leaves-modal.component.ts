import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExceptionalLeave } from '../../../../../../shared/models/leaves.model';
import { ExceptionalLeaveService } from '../../../../../../shared/services/exceptional-leave.service';
import { ModalHeaderComponent } from '../../../../../common/modal-header/modal-header.component';
import { ModalFooterComponent } from '../../../../../common/modal-footer/modal-footer.component';
import { FormErrorMessageComponent } from '../../../../../common/form-error-message/form-error-message.component';
import { AlertInformationComponent } from '../../../../../common/alert-information/alert-information.component';

@Component({
  selector: 'app-exceptional-leaves-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalHeaderComponent,
    ModalFooterComponent,
    FormErrorMessageComponent,
    AlertInformationComponent,
  ],
  templateUrl: './exceptional-leaves-modal.component.html',
})
export class ExceptionalLeavesModalComponent {
  @Input() open = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<ExceptionalLeave[]>();

  exceptionalLeaves: ExceptionalLeave[] = [];
  touched = false;

  constructor(private service: ExceptionalLeaveService) {
    this.exceptionalLeaves = this.service.getExceptionalLeaves();
  }

  trackByCode(_: number, leave: ExceptionalLeave): string {
    return leave.code;
  }

  //* Validation for a single leave
  isInvalidLeave(leave: ExceptionalLeave): boolean {
    return leave.grantedDays < leave.legalDays;
  }

  //* Global validation (used for disable and submit)
  get isInvalid(): boolean {
    return this.exceptionalLeaves.some(
      (leave) => leave.grantedDays < leave.legalDays
    );
  }

  getLeaveErrorMessage(leave: ExceptionalLeave): string {
    return `Minimum légal : ${leave.legalDays} jours`;
  }

  submit(): void {
    this.touched = true;

    if (this.isInvalid) {
      return; //* Do not emit
    }

    this.save.emit(this.exceptionalLeaves);
    this.close.emit();
  }
}
