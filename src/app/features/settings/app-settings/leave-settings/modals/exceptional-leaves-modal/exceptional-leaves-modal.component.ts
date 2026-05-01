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
import { ExceptionalLeaveNamePipe } from '../../pipes/exceptional-leave-name.pipe';
import { LeaveSettingsService } from '../../services/leave-settings.service';
import { GetExceptionalLeaveResponse } from '../../models/leave-settings.models';

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
    ExceptionalLeaveNamePipe,
  ],
  templateUrl: './exceptional-leaves-modal.component.html',
})
export class ExceptionalLeavesModalComponent implements OnChanges {
  @Input() open = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();

  exceptionalLeaves: GetExceptionalLeaveResponse[] = [];
  touched = false;
  loading = false;

  constructor(private leaveSettingsService: LeaveSettingsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open']?.currentValue === true) {
      this.touched = false;
      this.loading = false;
      this.loadLeaves();
    }
  }

  private loadLeaves(): void {
    this.leaveSettingsService.getAllExceptionalLeaves().subscribe({
      next: (leaves) => {
        this.exceptionalLeaves = leaves;
      },
    });
  }

  trackById(_: number, leave: GetExceptionalLeaveResponse): string {
    return leave.id;
  }

  //* Validation
  isInvalidLeave(leave: GetExceptionalLeaveResponse): boolean {
    return leave.grantedDays == null || leave.grantedDays < leave.legalBalance;
  }

  get isInvalid(): boolean {
    return this.exceptionalLeaves.some((leave) => this.isInvalidLeave(leave));
  }

  getLeaveErrorMessage(leave: GetExceptionalLeaveResponse): string {
    if (leave.grantedDays == null) {
      return 'Le nombre de jours accordés est obligatoire';
    }
    return `Minimum légal : ${leave.legalBalance} jour(s)`;
  }
  //* Submit
  submit(): void {
    if (this.isInvalid) return;

    this.loading = true;
    const payload = {
      exceptionalLeaves: this.exceptionalLeaves.map((leave) => ({
        id: leave.id,
        name: leave.name,
        grantedDays: leave.grantedDays,
      })),
    };

    this.leaveSettingsService.updateExceptionalLeaves(payload).subscribe({
      next: () => {
        this.loading = false;
        this.save.emit();
        this.close.emit();
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
