import { LeaveType } from './leave-type.enum';

export interface LeaveRequestFilter {
  startDate?: string;
  endDate?: string;
  leaveType?: LeaveType;
  approvedBy?: string;
  status?: string;
  sortBy?: string;
}
