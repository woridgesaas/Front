import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RfidService } from '../../services/rfid.service';
import { AttendanceAdmin } from '../../models/attendance.model';

type EnrollStep = 'CONFIRM' | 'ACTIVATING' | 'WAITING' | 'SUCCESS' | 'ERROR' | 'ALREADY_ENROLLED' | 'TIMEOUT';

@Component({
  selector: 'app-enroll-card-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './enroll-card-modal.component.html',
  styleUrl: './enroll-card-modal.component.scss'
})
export class EnrollCardModalComponent implements OnDestroy {

  @Input() employee!: AttendanceAdmin;
  @Output() close = new EventEmitter<void>();
  @Output() enrollSuccess = new EventEmitter<string>();

  step: EnrollStep = 'CONFIRM';

  private timeoutRef: any;
  private pollingRef: any;

  constructor(private rfidService: RfidService) {}

  activate(): void {
    this.step = 'ACTIVATING';

    this.rfidService.checkEnrollmentDone(this.employee.employeeId)
      .subscribe({
        next: (alreadyHasCard) => {
          if (alreadyHasCard) {
            this.step = 'ALREADY_ENROLLED';
            return;
          }
          this.rfidService.activateEnrollment(this.employee.employeeId)
            .subscribe({
              next: () => {
                this.step = 'WAITING';
                // Timeout 30s → étape TIMEOUT
                this.timeoutRef = setTimeout(() => {
                  this.step = 'TIMEOUT';
                  this.stopPolling();
                  // Revenir au mode attendance
                  this.rfidService.activateAttendance().subscribe();
                }, 10000);
                this.startPolling();
              },
              error: () => this.step = 'ERROR'
            });
        },
        error: () => this.step = 'ERROR'
      });
  }

  private startPolling(): void {
    this.pollingRef = setInterval(() => {
      this.rfidService.checkEnrollmentDone(this.employee.employeeId)
        .subscribe({
          next: (done) => {
            if (done) {
              this.step = 'SUCCESS';
              this.stopPolling();
              clearTimeout(this.timeoutRef);
              this.enrollSuccess.emit(this.employee.employeeId);
              setTimeout(() => this.closeModal(), 2000);
            }
          },
          error: () => {
            this.step = 'ERROR';
            this.stopPolling();
            clearTimeout(this.timeoutRef);
            this.rfidService.activateAttendance().subscribe();
          }
        });
    }, 2000);
  }

  private stopPolling(): void {
    clearInterval(this.pollingRef);
  }

  retry(): void {
    this.step = 'CONFIRM';
  }

  cancel(): void {
    this.rfidService.activateAttendance().subscribe();
    this.stopPolling();
    clearTimeout(this.timeoutRef);
    this.closeModal();
  }

  closeModal(): void {
    this.close.emit();
  }

  ngOnDestroy(): void {
    this.stopPolling();
    clearTimeout(this.timeoutRef);
  }
}