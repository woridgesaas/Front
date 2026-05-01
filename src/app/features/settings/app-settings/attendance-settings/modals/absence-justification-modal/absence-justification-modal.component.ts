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
  ConfigureAbsenceJustificationRequest,
  GetAbsenceJustificationResponse,
} from '../../models/attendance-settings.models';

const MIN_DELAY_HOURS = 1;

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
export class AbsenceJustificationModalComponent implements OnChanges {
  @Input() open = false;
  @Input() existingConfig: GetAbsenceJustificationResponse | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<ConfigureAbsenceJustificationRequest>();

  readonly MIN_DELAY_HOURS = MIN_DELAY_HOURS;

  justificationDelayRaw: any = 24;
  justificationDelay = 24;
  touched = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open']?.currentValue === true) {
      this.touched = false;
      this.justificationDelay = this.existingConfig?.allowedDelayInHours ?? 24;
      this.justificationDelayRaw = this.justificationDelay;
    }
  }

  onDelayChange(value: any): void {
    const parsed = Number(value);
    this.justificationDelay =
      value === '' || value === null || isNaN(parsed) ? NaN : parsed;
    this.touched = true;
  }

  //* Validation
  get isInvalid(): boolean {
    return (
      this.justificationDelay === null ||
      this.justificationDelay === undefined ||
      isNaN(this.justificationDelay) ||
      this.justificationDelay < MIN_DELAY_HOURS
    );
  }

  getErrorMessage(): string {
    if (isNaN(this.justificationDelay) || this.justificationDelay === null) {
      return 'Veuillez entrer un nombre valide';
    }
    return `Le délai doit être supérieur ou égal à ${MIN_DELAY_HOURS} heure`;
  }

  //* Submit
  submit(): void {
    if (this.isInvalid) return;

    const payload: ConfigureAbsenceJustificationRequest = {
      allowedDelayInHours: this.justificationDelay,
    };

    this.save.emit(payload);
  }
}
