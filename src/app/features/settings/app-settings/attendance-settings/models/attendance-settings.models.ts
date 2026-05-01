import { WorkScheduleType } from '../enums/work-schedule-type.enum';

//* Absence justification
export interface ConfigureAbsenceJustificationRequest {
  allowedDelayInHours: number;
}

export interface GetAbsenceJustificationResponse {
  allowedDelayInHours: number;
}

//* Alert threshold
export interface ConfigureAlertThresholdRequest {
  warningThreshold: number;
  criticalThreshold: number;
}

export interface GetAlertThresholdResponse {
  warningThreshold: number;
  criticalThreshold: number;
}

//* Work schedule
export interface ConfigureWorkScheduleRequest {
  type: WorkScheduleType;
  entryTime?: string | null;
  exitTime?: string | null;
  dailyHours?: number | null;
}

export interface GetWorkScheduleResponse {
  type: WorkScheduleType;
  entryTime?: string | null;
  exitTime?: string | null;
  dailyHours?: number | null;
}
