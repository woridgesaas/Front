import { LeaveType } from './leave-type.enum';

export interface ApprovedBy {
  fullName: string;
}

export interface LeaveRequestListResponse {
  id: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  numberOfDays: number;
  status: 'New' | 'Approved' | 'Declined';
  approvedBy: ApprovedBy;
}
