import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalHeaderComponent } from '../../../../../common/modal-header/modal-header.component';
import { ModalFooterComponent } from '../../../../../common/modal-footer/modal-footer.component';
import { FormErrorMessageComponent } from '../../../../../common/form-error-message/form-error-message.component';
import { WorkScheduleSettings } from '../../../../../../shared/models/work-schedule.model';
import { WorkTimeMode } from '../../../../../../shared/enum/work-time-mode.enum';
import { SwitchButtonComponent } from '../../../../../common/switch-button/switch-button.component';
import { AlertInformationComponent } from '../../../../../common/alert-information/alert-information.component';

@Component({
  selector: 'app-work-schedule-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalHeaderComponent,
    ModalFooterComponent,
    FormErrorMessageComponent,
    SwitchButtonComponent,
    AlertInformationComponent,
  ],
  templateUrl: './work-schedule-modal.component.html',
})
export class WorkScheduleModalComponent {
  @Input() open = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<WorkScheduleSettings>();

  WorkTimeMode = WorkTimeMode;
  workTimeMode: WorkTimeMode = WorkTimeMode.STRICT;
  startTime = '08:00';
  endTime = '17:00';
  dailyHours = 8;
  touchedStrict = false;
  touchedHours = false;

  //* Validation
  get isInvalid(): boolean {
    if (this.workTimeMode === WorkTimeMode.STRICT) {
      return !this.startTime || !this.endTime || this.startTime >= this.endTime;
    }

    return this.dailyHours <= 0;
  }

  getErrorMessage(): string {
    if (this.workTimeMode === WorkTimeMode.STRICT) {
      return 'Les horaires doivent être valides (entrée < sortie).';
    }

    return "Le nombre d'heures doit être supérieur à 0.";
  }

  switchMode(mode: WorkTimeMode): void {
    this.workTimeMode = mode;
  }

  submit(): void {
    if (this.workTimeMode === WorkTimeMode.STRICT) {
      this.touchedStrict = true;
    }

    if (this.workTimeMode === WorkTimeMode.HOURS) {
      this.touchedHours = true;
    }

    if (this.isInvalid) {
      return;
    }

    const payload: WorkScheduleSettings = {
      mode: this.workTimeMode,
      startTime:
        this.workTimeMode === WorkTimeMode.STRICT ? this.startTime : undefined,
      endTime:
        this.workTimeMode === WorkTimeMode.STRICT ? this.endTime : undefined,
      dailyHours:
        this.workTimeMode === WorkTimeMode.HOURS ? this.dailyHours : undefined,
    };

    this.save.emit(payload);
    this.close.emit();
  }
}
