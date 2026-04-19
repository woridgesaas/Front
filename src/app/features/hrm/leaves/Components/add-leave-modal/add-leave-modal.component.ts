import {
  Component,
  EventEmitter,
  Output,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LeaveType } from '../../models/leave-type.enum';
import { LeaveService } from '../../services/leave.service';
import { SimulateLeaveResponse } from '../../models/simulate-leave-response.model';
import { ToastService } from '../../../../../shared/services/toast.service';
import { ApiErrorService } from '../../services/api-error.service';

declare const bootstrap: any;

@Component({
  selector: 'app-add-leave-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, BsDatepickerModule, MatSelectModule],
  templateUrl: './add-leave-modal.component.html',
})
export class AddLeaveModalComponent implements OnDestroy {
  @Output() save = new EventEmitter<void>();
  @ViewChild('addLeaveModal') modalRef!: ElementRef;
  // Enum exposé au template
  LeaveType = LeaveType;

  // Champs formulaire
  selectedLeaveType: LeaveType | '' = '';
  startDate: Date | null = null;
  endDate: Date | null = null;
  selectedFile: File | null = null;

  // Résultats simulation
  numberOfDays: number | null = null;
  remainingBalance: number | null = null;
  isSimulating = false;

  showJustificatif = false;

  // Debounce simulation
  private simulateSubject = new Subject<void>();
  private simulateSub: Subscription;

  constructor(
    private leaveService: LeaveService,
    private toastService: ToastService,
    private apiErrorService: ApiErrorService // ← ajouter
  ) {
    this.simulateSub = this.simulateSubject
      .pipe(debounceTime(400))
      .subscribe(() => this.runSimulate());
  }

  onLeaveTypeChange(type: LeaveType): void {
    this.selectedLeaveType = type;
    this.showJustificatif =
      type === LeaveType.EXCEPTIONAL || type === LeaveType.MEDICAL;
    this.triggerSimulate();
  }

  onStartDateChange(date: Date): void {
    this.startDate = date;
    this.triggerSimulate();
  }

  onEndDateChange(date: Date): void {
    this.endDate = date;
    this.triggerSimulate();
  }

  private triggerSimulate(): void {
    if (this.selectedLeaveType && this.startDate && this.endDate) {
      this.simulateSubject.next();
    }
  }

  private runSimulate(): void {
    if (!this.selectedLeaveType || !this.startDate || !this.endDate) return;

    this.isSimulating = true;
    this.leaveService
      .simulate(
        this.selectedLeaveType as LeaveType,
        this.formatDate(this.startDate),
        this.formatDate(this.endDate)
      )
      .subscribe({
        next: (res: SimulateLeaveResponse) => {
          this.numberOfDays = res.numberOfDays;
          this.remainingBalance = res.remainingBalance;
          this.isSimulating = false;

          // ← ajouter cette vérification
          if (res.remainingBalance < 0) {
            this.toastService.warning('Votre solde de congés est insuffisant');
          }
        },
        error: (err) => {
          this.toastService.error(this.apiErrorService.resolve(err));
          this.isSimulating = false;
          this.numberOfDays = null;
          this.remainingBalance = null;
        },
      });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  submit(): void {
    if (!this.selectedLeaveType || !this.startDate || !this.endDate) {
      this.toastService.warning(
        'Veuillez remplir tous les champs obligatoires'
      );
      return;
    }

    if (this.showJustificatif && !this.selectedFile) {
      this.toastService.warning('Le justificatif est obligatoire');
      return;
    }

    this.leaveService
      .createLeave(
        {
          leaveType: this.selectedLeaveType as LeaveType,
          startDate: this.formatDate(this.startDate),
          endDate: this.formatDate(this.endDate),
        },
        this.selectedFile
      )
      .subscribe({
        next: () => {
          this.toastService.success('Congé ajouté avec succès');
          this.save.emit();
          this.resetForm();
          this.closeModal();
        },
        error: (err) => {
          this.toastService.error(this.apiErrorService.resolve(err));
          this.isSimulating = false;
          this.resetForm();
        },
      });
  }
  private closeModal(): void {
    const modal = bootstrap.Modal.getInstance(this.modalRef.nativeElement);
    modal?.hide();
  }
  private formatDate(date: Date): string {
    // Format ISO yyyy-MM-dd pour le backend
    return date.toISOString().split('T')[0];
  }

  private resetForm(): void {
    this.selectedLeaveType = '';
    this.startDate = null;
    this.endDate = null;
    this.selectedFile = null;
    this.numberOfDays = null;
    this.remainingBalance = null;
    this.showJustificatif = false;
  }

  ngOnDestroy(): void {
    this.simulateSub.unsubscribe();
  }
}
