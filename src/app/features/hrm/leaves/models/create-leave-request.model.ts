import { LeaveType } from './leave-type.enum';

export interface CreateLeaveRequest {
  leaveType: LeaveType;
  startDate: string; // LocalDate → string ISO "yyyy-MM-dd"
  endDate: string;
}
