import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';
import { LeaveType } from '../../models/leave-type.enum';

@Component({
  selector: 'app-leaves-table',
  standalone: true,
  imports: [CommonModule, MatSortModule],
  templateUrl: './leaves-table.component.html',
})
export class LeavesTableComponent {


  // any[] pour rester compatible avec LeaveEmployeeComponent (legacy)
  // qui passe encore leaveEmployee[] — à migrer côté collègue
  @Input() tableData: any[] = [];

  @Output() sort   = new EventEmitter<any>();
  @Output() edit   = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  readonly leaveTypeLabels: Record<string, string> = {
    [LeaveType.ANNUAL]:      'Congé annuel',
    [LeaveType.EXCEPTIONAL]: 'Congé exceptionnel',
    [LeaveType.MEDICAL]:     'Congé maladie',
  };

  readonly statusBg: Record<string, string> = {
  APPROVED: 'bg-transparent-success',
  REJECTED: 'bg-transparent-danger',
  NEW:      'bg-transparent-primary',
};

readonly statusColor: Record<string, string> = {
  APPROVED: 'text-success',
  REJECTED: 'text-danger',
  NEW:      'text-primary',
};

readonly statusLabels: Record<string, string> = {
  APPROVED: 'Approuvé',
  REJECTED: 'Refusé',
  NEW:      'Nouveau',
};

canEdit(status: string): boolean {
  return status?.toUpperCase() === 'NEW';
}

canDelete(status: string): boolean {
  return status?.toUpperCase() === 'REJECTED';
}
}
