export interface AttendanceAdmin {
  sNo?: number;
  isSelected?: boolean;
  Employee: string;
  Image: string;
  Role: string;
  Department: string | null;
  Date: string | number | Date;
  CheckIn: string;
  CheckOut: string;
  Break: string;
  Late: string;
  Production: number;
  ProductionHours: string;
  Status: 'Present' | 'Absent' | 'Overtime';
  isOvertime?: boolean;
  overtimeDecision?: 'PENDING' | 'APPROVED' | 'REJECTED';

  // ✅ Obligatoires — toujours fournis par l'API
  employeeId: string;
  hasRfidCard: boolean;
}

export interface EnrollResponse {
  action: string;
  employeeName: string;
}

export interface ScanResponse {
  action: string;
  employeeName: string;
  checkInTime: string;
  checkOutTime: string;
}