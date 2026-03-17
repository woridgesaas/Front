import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RfidService } from '../../services/rfid.service';
import { AttendanceAdmin } from '../../models/attendance.model';

type EnrollStep = 'CONFIRM' | 'ACTIVATING' | 'WAITING' | 'SUCCESS' | 'ERROR' | 'ALREADY_ENROLLED';

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

  step: EnrollStep = 'CONFIRM';

  private timeoutRef: any;
  private pollingRef: any;

  constructor(private rfidService: RfidService) {}

  activate(): void {
    if (!this.employee.employeeId) {
      this.step = 'ERROR';
      return;
    }

    // Montrer activation en cours pendant l'appel HTTP
    this.step = 'ACTIVATING';

    // 1. Vérifier si carte déjà associée AVANT d'activer
    this.rfidService.checkEnrollmentDone(this.employee.employeeId)
      .subscribe({
        next: (alreadyHasCard) => {
          if (alreadyHasCard) {
            this.step = 'ALREADY_ENROLLED';
            return;
          }

          // 2. Pas de carte → activer enrollment
          this.rfidService.activateEnrollment(this.employee.employeeId!)
            .subscribe({
              next: () => {
                this.step = 'WAITING';
                this.timeoutRef = setTimeout(() => this.cancel(), 30000);
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
      this.rfidService.checkEnrollmentDone(this.employee.employeeId!)
        .subscribe({
          next: (done) => {
            if (done) {
              this.step = 'SUCCESS';
              this.stopPolling();
              clearTimeout(this.timeoutRef);
              setTimeout(() => this.closeModal(), 2000);
            }
          }
        });
    }, 2000);
  }

  private stopPolling(): void {
    clearInterval(this.pollingRef);
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