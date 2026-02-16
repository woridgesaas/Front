import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leaves-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leaves-table.component.html',
})
export class LeavesTableComponent {
  @Input() tableData: any[] = [];

  @Output() sort = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  // 🔹 UI mapping
  statusBg: any = {
    Approved: 'bg-transparent-success',
    Declined: 'bg-transparent-danger',
    New: 'bg-transparent-primary',
  };

  statusColor: any = {
    Approved: 'text-success',
    Declined: 'text-danger',
    New: 'text-primary',
  };

  canEditLeave(status: string): boolean {
    return status === 'New';
  }

  canDeleteLeave(status: string): boolean {
    return status === 'Declined' || status === 'Refused';
  }
}
