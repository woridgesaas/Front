import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { WorkScheduleModalComponent } from './modals/work-schedule-modal/work-schedule-modal.component';
import { AbsenceJustificationModalComponent } from './modals/absence-justification-modal/absence-justification-modal.component';
import { WarningThresholdsModalComponent } from './modals/warning-thresholds-modal/warning-thresholds-modal.component';
import { SwitchButtonComponent } from '../../../common/switch-button/switch-button.component';
import { SettingsHeaderComponent } from '../components/settings-header/settings-header.component';
import { AttendanceSettingsService } from './services/attendance-settings.service';
import { ToastrService } from 'ngx-toastr';
import { ApiErrorHandler } from '../../../../shared/utils/api-error-handler.utils';
import {
  ConfigureAbsenceJustificationRequest,
  ConfigureAlertThresholdRequest,
  ConfigureWorkScheduleRequest,
  GetAbsenceJustificationResponse,
  GetAlertThresholdResponse,
  GetWorkScheduleResponse,
} from './models/attendance-settings.models';
import { FormChangeDetector } from '../../../../shared/utils/form-change-detector.utils';
import { AttendanceSettingTab } from './enums/attendance-setting-tab.enum';

@Component({
  selector: 'app-attendance-settings',
  standalone: true,
  imports: [
    CommonModule,
    SwitchButtonComponent,
    WorkScheduleModalComponent,
    AbsenceJustificationModalComponent,
    WarningThresholdsModalComponent,
    SettingsHeaderComponent,
  ],
  templateUrl: './attendance-settings.component.html',
  styleUrl: './attendance-settings.component.scss',
})
export class AttendanceSettingsComponent implements OnInit {
  @Output() configured = new EventEmitter<void>();

  AttendanceSettingTab = AttendanceSettingTab;
  activeTab: AttendanceSettingTab = AttendanceSettingTab.SCHEDULE;

  //* Modal visibility
  scheduleModalOpen = false;
  justificationModalOpen = false;
  thresholdsModalOpen = false;

  //* Current config loaded from backend (null = not configured yet)
  currentSchedule: GetWorkScheduleResponse | null = null;
  currentJustification: GetAbsenceJustificationResponse | null = null;
  currentThresholds: GetAlertThresholdResponse | null = null;

  //* Change detectors (null = first time configuration)
  private scheduleChangeDetector: FormChangeDetector<ConfigureWorkScheduleRequest> | null =
    null;
  private justificationChangeDetector: FormChangeDetector<ConfigureAbsenceJustificationRequest> | null =
    null;
  private thresholdsChangeDetector: FormChangeDetector<ConfigureAlertThresholdRequest> | null =
    null;

  private hasBeenConfigured = false;

  constructor(
    private attendanceService: AttendanceSettingsService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.loadExistingConfigurations();
  }

  //* Load existing config from backend
  private loadExistingConfigurations(): void {
    this.loadWorkSchedule();
    this.loadAbsenceJustification();
    this.loadAlertThreshold();
  }

  private loadWorkSchedule(): void {
    this.attendanceService.getWorkSchedule().subscribe({
      next: (data) => {
        this.currentSchedule = data;
        this.scheduleChangeDetector =
          new FormChangeDetector<ConfigureWorkScheduleRequest>({
            type: data.type,
            entryTime: data.entryTime ?? null,
            exitTime: data.exitTime ?? null,
            dailyHours: data.dailyHours ?? null,
          });
      },
      error: () => {
        this.currentSchedule = null;
        this.scheduleChangeDetector = null;
      },
    });
  }

  private loadAbsenceJustification(): void {
    this.attendanceService.getAbsenceJustification().subscribe({
      next: (data) => {
        this.currentJustification = data;
        this.justificationChangeDetector =
          new FormChangeDetector<ConfigureAbsenceJustificationRequest>({
            allowedDelayInHours: data.allowedDelayInHours,
          });
      },
      error: () => {
        this.currentJustification = null;
        this.justificationChangeDetector = null;
      },
    });
  }

  private loadAlertThreshold(): void {
    this.attendanceService.getAlertThreshold().subscribe({
      next: (data) => {
        this.currentThresholds = data;
        this.thresholdsChangeDetector =
          new FormChangeDetector<ConfigureAlertThresholdRequest>({
            warningThreshold: data.warningThreshold,
            criticalThreshold: data.criticalThreshold,
          });
      },
      error: () => {
        this.currentThresholds = null;
        this.thresholdsChangeDetector = null;
      },
    });
  }

  //* Open modals
  openScheduleModal(): void {
    this.activeTab = AttendanceSettingTab.SCHEDULE;
    this.scheduleModalOpen = true;
    this.justificationModalOpen = false;
    this.thresholdsModalOpen = false;
  }

  openJustificationModal(): void {
    this.activeTab = AttendanceSettingTab.JUSTIFICATION;
    this.justificationModalOpen = true;
    this.scheduleModalOpen = false;
    this.thresholdsModalOpen = false;
  }

  openThresholdsModal(): void {
    this.activeTab = AttendanceSettingTab.THRESHOLDS;
    this.thresholdsModalOpen = true;
    this.scheduleModalOpen = false;
    this.justificationModalOpen = false;
  }

  //* Save handlers
  saveWorkSchedule(payload: ConfigureWorkScheduleRequest): void {
    if (
      this.scheduleChangeDetector &&
      !this.scheduleChangeDetector.hasChanges(payload)
    ) {
      this.toastr.warning('Aucune modification détectée');
      this.scheduleModalOpen = false;
      return;
    }

    this.attendanceService.configureWorkSchedule(payload).subscribe({
      next: () => {
        this.toastr.success('Horaires de travail configurés avec succès');
        this.currentSchedule = payload as GetWorkScheduleResponse;
        this.scheduleChangeDetector = new FormChangeDetector(payload);
        this.scheduleModalOpen = false;
        this.markAsConfigured();
      },
      error: (err: HttpErrorResponse) =>
        ApiErrorHandler.handle(err, this.toastr),
    });
  }

  saveAbsenceJustification(
    payload: ConfigureAbsenceJustificationRequest,
  ): void {
    if (
      this.justificationChangeDetector &&
      !this.justificationChangeDetector.hasChanges(payload)
    ) {
      this.toastr.warning('Aucune modification détectée');
      this.justificationModalOpen = false;
      return;
    }

    this.attendanceService.configureAbsenceJustification(payload).subscribe({
      next: () => {
        this.toastr.success('Délai de justification configuré avec succès');
        this.currentJustification = payload;
        this.justificationChangeDetector = new FormChangeDetector(payload);
        this.justificationModalOpen = false;
        this.markAsConfigured();
      },
      error: (err: HttpErrorResponse) =>
        ApiErrorHandler.handle(err, this.toastr),
    });
  }

  saveAlertThresholds(payload: ConfigureAlertThresholdRequest): void {
    if (
      this.thresholdsChangeDetector &&
      !this.thresholdsChangeDetector.hasChanges(payload)
    ) {
      this.toastr.warning('Aucune modification détectée');
      this.thresholdsModalOpen = false;
      return;
    }

    this.attendanceService.configureAlertThreshold(payload).subscribe({
      next: () => {
        this.toastr.success("Seuils d'alerte configurés avec succès");
        this.currentThresholds = payload;
        this.thresholdsChangeDetector = new FormChangeDetector(payload);
        this.thresholdsModalOpen = false;
        this.markAsConfigured();
      },
      error: (err: HttpErrorResponse) =>
        ApiErrorHandler.handle(err, this.toastr),
    });
  }

  //* Helpers
  private markAsConfigured(): void {
    if (!this.hasBeenConfigured) {
      this.hasBeenConfigured = true;
      this.configured.emit();
    }
  }
}
