import { WorkTimeMode } from "../enum/work-time-mode.enum";

export interface WorkScheduleSettings {
  mode: WorkTimeMode;
  startTime?: string;
  endTime?: string;
  dailyHours?: number;
}
