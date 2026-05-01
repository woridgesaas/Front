import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalHeaderComponent } from '../../../../../common/modal-header/modal-header.component';
import { ModalFooterComponent } from '../../../../../common/modal-footer/modal-footer.component';
import { FormErrorMessageComponent } from '../../../../../common/form-error-message/form-error-message.component';
import { AlertInformationComponent } from '../../../../../common/alert-information/alert-information.component';
import {
  ConfigureAlertThresholdRequest,
  GetAlertThresholdResponse,
} from '../../models/attendance-settings.models';

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
export class WarningThresholdsModalComponent implements OnChanges {
  @Input() open = false;
  @Input() existingConfig: GetAlertThresholdResponse | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<ConfigureAlertThresholdRequest>();

  warningThreshold = 3;
  criticalThreshold = 7;
  touched = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open']?.currentValue === true) {
      this.touched = false;
      this.warningThreshold = this.existingConfig?.warningThreshold ?? 3;
      this.criticalThreshold = this.existingConfig?.criticalThreshold ?? 7;
    }
  }

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
      return 'Le seuil de notification ne doit pas être vide';
    }
    if (this.criticalThreshold == null) {
      return 'Le seuil critique ne doit pas être vide';
    }
    if (this.warningThreshold <= 0 || this.criticalThreshold <= 0) {
      return 'Les seuils doivent être supérieurs à 0';
    }
    if (this.warningThreshold >= this.criticalThreshold) {
      return 'Le seuil critique doit être supérieur au seuil de notification';
    }
    return '';
  }

  //* Submit
  submit(): void {
    if (this.isInvalid) return;

    const payload: ConfigureAlertThresholdRequest = {
      warningThreshold: this.warningThreshold,
      criticalThreshold: this.criticalThreshold,
    };

    this.save.emit(payload);
  }
}
