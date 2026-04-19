import { LeaveType } from './leave-type.enum';

export interface LeaveRequestResponse {
  id: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  numberOfDays: number;
  remainingBalance: number;
  justificationPath?: string;
  requestDate: string;
}
