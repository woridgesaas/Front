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
import { SwitchButtonComponent } from '../../../../../common/switch-button/switch-button.component';
import { AlertInformationComponent } from '../../../../../common/alert-information/alert-information.component';
import { WorkScheduleType } from '../../enums/work-schedule-type.enum';
import {
  ConfigureWorkScheduleRequest,
  GetWorkScheduleResponse,
} from '../../models/attendance-settings.models';
import { FormErrorMessageComponent } from '../../../../../common/form-error-message/form-error-message.component';

const MIN_DAILY_HOURS = 1;
const MAX_DAILY_HOURS = 12;

@Component({
  selector: 'app-work-schedule-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalHeaderComponent,
    ModalFooterComponent,
    SwitchButtonComponent,
    AlertInformationComponent,
    FormErrorMessageComponent,
  ],
  templateUrl: './work-schedule-modal.component.html',
})
export class WorkScheduleModalComponent implements OnChanges {
  @Input() open = false;
  @Input() existingConfig: GetWorkScheduleResponse | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<ConfigureWorkScheduleRequest>();

  WorkScheduleType = WorkScheduleType;
  readonly MIN_DAILY_HOURS = MIN_DAILY_HOURS;
  readonly MAX_DAILY_HOURS = MAX_DAILY_HOURS;

  scheduleType: WorkScheduleType = WorkScheduleType.FIXED_HOURS;
  startTime = '08:00';
  endTime = '17:00';
  dailyHoursRaw: any = 8;
  dailyHours = 8;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open']?.currentValue === true) {
      if (this.existingConfig) {
        this.scheduleType = this.existingConfig.type;
        this.startTime =
          this.stripSeconds(this.existingConfig.entryTime) ?? '08:00';
        this.endTime =
          this.stripSeconds(this.existingConfig.exitTime) ?? '17:00';
        this.dailyHours = this.existingConfig.dailyHours ?? 8;
        this.dailyHoursRaw = this.dailyHours;
      } else {
        this.scheduleType = WorkScheduleType.FIXED_HOURS;
        this.startTime = '08:00';
        this.endTime = '17:00';
        this.dailyHours = 8;
        this.dailyHoursRaw = 8;
      }
    }
  }

  onDailyHoursChange(value: any): void {
    const parsed = Number(value);
    this.dailyHours =
      value === '' || value === null || isNaN(parsed) ? NaN : parsed;
  }

  switchScheduleType(type: WorkScheduleType): void {
    this.scheduleType = type;
  }

  //* Validation
  get fixedHoursErrors(): string[] {
    if (this.scheduleType !== WorkScheduleType.FIXED_HOURS) return [];
    const errors: string[] = [];
    if (!this.startTime) {
      errors.push("L'heure d'entrée est obligatoire");
    }
    if (!this.endTime) {
      errors.push("L'heure de sortie est obligatoire");
    }
    if (this.startTime && this.endTime && this.startTime >= this.endTime) {
      errors.push("L'heure de sortie doit être après l'heure d'entrée");
    }
    return errors;
  }

  get flexibleHoursErrors(): string[] {
    if (this.scheduleType !== WorkScheduleType.FLEXIBLE_HOURS) return [];
    const errors: string[] = [];
    if (
      this.dailyHours === null ||
      this.dailyHours === undefined ||
      isNaN(this.dailyHours)
    ) {
      errors.push("Le nombre d'heures journalières est obligatoire");
    } else if (
      this.dailyHours < MIN_DAILY_HOURS ||
      this.dailyHours > MAX_DAILY_HOURS
    ) {
      errors.push(
        `Le nombre d'heures doit être compris entre ${MIN_DAILY_HOURS} et ${MAX_DAILY_HOURS}`,
      );
    }
    return errors;
  }

  get isInvalid(): boolean {
    return (
      this.fixedHoursErrors.length > 0 || this.flexibleHoursErrors.length > 0
    );
  }

  //* Submit
  submit(): void {
    if (this.isInvalid) return;

    const payload: ConfigureWorkScheduleRequest = {
      type: this.scheduleType,
      entryTime:
        this.scheduleType === WorkScheduleType.FIXED_HOURS
          ? this.startTime
          : null,
      exitTime:
        this.scheduleType === WorkScheduleType.FIXED_HOURS
          ? this.endTime
          : null,
      dailyHours:
        this.scheduleType === WorkScheduleType.FLEXIBLE_HOURS
          ? this.dailyHours
          : null,
    };

    this.save.emit(payload);
  }

  private stripSeconds(time: string | null | undefined): string | null {
    if (!time) return null;
    return time.length > 5 ? time.substring(0, 5) : time;
  }
}
