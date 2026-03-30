export type PayrollStatus = 'EN_ATTENTE' | 'VALIDEE' | 'REJETEE';

export interface PayrollSummary {
  id: string;
  month: number;
  year: number;
  periodDate: string;
  grossSalary: number;
  netSalary: number;
  status: PayrollStatus;
  employeeFullName: string;  // ✅ nouveau
  employeeCIN: string;    
}

export interface PayrollLine {
  label: string;
  type: 'GAIN' | 'RETENUE' | 'FISCAL' | 'INFO';
  baseValue: number | null;
  rate: number | null;
  amount: number;
}

export interface PayrollDetail {
  id: string;
  periodDate: string;
  baseSalary: number;
  grossSalary: number;
  netSalary: number;
  totalOvertimeHours: number;
  totalAbsenceDays: number;
  status: PayrollStatus;
  generatedAt: string;
  details: PayrollLine[];
}