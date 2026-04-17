export type RequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export type SectionType =
  | 'PERSONAL_INFORMATION'
  | 'BANK_INFORMATION'
  | 'EDUCATION'
  | 'PROFESSIONAL_EXPERIENCE';

export interface FieldChangeSummary {
  fieldName: string;
  fieldLabel: string;
  oldValue: string | null;
  newValue: string | null;
}

export interface ProfileUpdateSummaryRequest {
  requestId: string;
  userId: string;
  employeeFullName: string;
  sectionType: SectionType;
  targetEntityId: string;
  numberOfChanges: number;
  status: RequestStatus;
  requestedAt: string;
}

export interface ProfileUpdateDetailsRequest {
  requestId: string;
  userId: string;
  employeeFullName: string;
  sectionType: SectionType;
  targetEntityId: string;
  status: RequestStatus;
  requestedAt: string;
  processedAt: string | null;
  processedBy: string | null;
  fieldChanges: FieldChangeSummary[];
}
