import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { leaveEmployee } from '../../../../../shared/models/models';

@Component({
  selector: 'app-edit-leave-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, BsDatepickerModule, MatSelectModule],
  templateUrl: './edit-leave-modal.component.html',
})
export class EditLeaveModalComponent {
  @Input() leave: leaveEmployee | null = null;
  @Output() update = new EventEmitter<leaveEmployee>();

  selectedLeaveType = '';
  showJustificatif = false;
  selectedFile: File | undefined = undefined;

  ngOnChanges(): void {
    if (!this.leave) return;

    this.selectedLeaveType = this.leave.LeaveType;
    this.showJustificatif =
      this.leave.LeaveType === 'medical' ||
      this.leave.LeaveType === 'exceptionnel';
  }

  onLeaveTypeChange(type: string): void {
    this.selectedLeaveType = type;
    this.showJustificatif = type === 'medical' || type === 'exceptionnel';
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0];
  }

  submit(): void {
    if (!this.leave) return;

    this.update.emit({
      ...this.leave,
      LeaveType: this.selectedLeaveType,
      justificatif: this.selectedFile,
    });
  }
}
