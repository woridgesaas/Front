import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-leave-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, BsDatepickerModule, MatSelectModule],
  templateUrl: './add-leave-modal.component.html',
})
export class AddLeaveModalComponent {
  selectedLeaveType = '';
  showJustificatif = false;

  @Output() save = new EventEmitter<any>();

  onLeaveTypeChange(type: string): void {
    this.selectedLeaveType = type;
    this.showJustificatif = type === 'medical' || type === 'exceptionnel';
  }

  submit(): void {
    this.save.emit({
      leaveType: this.selectedLeaveType,
      justificatif: this.selectedFile,
    });
  }

  selectedFile: File | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
}
