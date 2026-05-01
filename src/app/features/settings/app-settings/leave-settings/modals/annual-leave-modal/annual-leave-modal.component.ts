import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalHeaderComponent } from '../../../../../common/modal-header/modal-header.component';
import { ModalFooterComponent } from '../../../../../common/modal-footer/modal-footer.component';
import { FormErrorMessageComponent } from '../../../../../common/form-error-message/form-error-message.component';
import { AlertInformationComponent } from '../../../../../common/alert-information/alert-information.component';
import { LeaveSettingsService } from '../../services/leave-settings.service';
import { GetAnnualBalanceResponse } from '../../models/leave-settings.models';

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
export class AnnualLeaveModalComponent implements OnChanges {
  @Input() open = false;
  @Input() existingConfig: GetAnnualBalanceResponse | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();

  annualLeaveDays: number | null = 18;
  touched = false;
  loading = false;

  constructor(private leaveSettingsService: LeaveSettingsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open']?.currentValue === true) {
      this.touched = false;
      this.loading = false;
      this.annualLeaveDays = this.existingConfig?.balance ?? 18;
    }
  }

  //* Validation
  get isInvalid(): boolean {
    return this.annualLeaveDays === null || this.annualLeaveDays < 1;
  }

  getErrorMessage(): string {
    if (this.annualLeaveDays === null || isNaN(this.annualLeaveDays as any)) {
      return 'Le solde de congé annuel ne peut pas être vide';
    }
    if (this.annualLeaveDays < 1) {
      return 'Le solde de congé annuel doit être au moins 1 jour';
    }
    return '';
  }

  //* Submit
  submit(): void {
    if (this.isInvalid) return;

    this.loading = true;
    this.leaveSettingsService
      .configureAnnualBalance({ balance: this.annualLeaveDays as number })
      .subscribe({
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