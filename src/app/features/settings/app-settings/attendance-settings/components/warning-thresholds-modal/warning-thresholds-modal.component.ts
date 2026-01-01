import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalHeaderComponent } from '../../../../../common/modal-header/modal-header.component';
import { ModalFooterComponent } from '../../../../../common/modal-footer/modal-footer.component';
import { FormErrorMessageComponent } from '../../../../../common/form-error-message/form-error-message.component';
import { AlertInformationComponent } from '../../../../../common/alert-information/alert-information.component';

@Component({
  selector: 'app-warning-thresholds-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalHeaderComponent,
    ModalFooterComponent,
    FormErrorMessageComponent,
    AlertInformationComponent,
  ],
  templateUrl: './warning-thresholds-modal.component.html',
})
export class WarningThresholdsModalComponent {
  @Input() open = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<{ warning: number; critical: number }>();

  warningThreshold = 3;
  criticalThreshold = 7;
  touched = false;

  //* Validation
  get isInvalid(): boolean {
    return (
      this.warningThreshold == null ||
      this.criticalThreshold == null ||
      this.warningThreshold <= 0 ||
      this.criticalThreshold <= 0 ||
      this.warningThreshold >= this.criticalThreshold
    );
  }

  getErrorMessage(): string {
    if (this.warningThreshold == null) {
      return 'Le seuil de notification ne doit pas être vide.';
    }

    if (this.criticalThreshold == null) {
      return 'Le seuil critique ne doit pas être vide.';
    }

    if (this.warningThreshold <= 0 || this.criticalThreshold <= 0) {
      return 'Les seuils doivent être supérieurs à 0.';
    }

    if (this.warningThreshold >= this.criticalThreshold) {
      return 'Le seuil critique doit être supérieur au seuil de notification.';
    }

    return '';
  }

  submit(): void {
    this.touched = true;

    if (this.isInvalid) {
      return;
    }

    this.save.emit({
      warning: this.warningThreshold,
      critical: this.criticalThreshold,
    });

    this.close.emit();
  }
}
