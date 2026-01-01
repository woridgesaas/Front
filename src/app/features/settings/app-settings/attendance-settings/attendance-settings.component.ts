import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkScheduleModalComponent } from './components/work-schedule-modal/work-schedule-modal.component';
import { AbsenceJustificationModalComponent } from './components/absence-justification-modal/absence-justification-modal.component';
import { WarningThresholdsModalComponent } from './components/warning-thresholds-modal/warning-thresholds-modal.component';
import { SwitchButtonComponent } from '../../../common/switch-button/switch-button.component';
import { AttendanceSettingTab } from '../../../../shared/enum/attendance-setting-tab.enum';
import { SettingsHeaderComponent } from '../components/settings-header/settings-header.component';

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
export class AttendanceSettingsComponent {
  AttendanceSettingTab = AttendanceSettingTab;

  //* Active button
  activeTab: AttendanceSettingTab = AttendanceSettingTab.SCHEDULE;

  //* Modals
  scheduleModalOpen = false;
  justificationModalOpen = false;
  thresholdsModalOpen = false;

  //* Open schedule modal
  openScheduleModal(): void {
    this.activeTab = AttendanceSettingTab.SCHEDULE;
    this.scheduleModalOpen = true;
    this.justificationModalOpen = false;
    this.thresholdsModalOpen = false;
  }

  //* Open justification modal
  openJustificationModal(): void {
    this.activeTab = AttendanceSettingTab.JUSTIFICATION;
    this.justificationModalOpen = true;
    this.scheduleModalOpen = false;
    this.thresholdsModalOpen = false;
  }

  //* Open thresholds modal
  openThresholdsModal(): void {
    this.activeTab = AttendanceSettingTab.THRESHOLDS;
    this.thresholdsModalOpen = true;
    this.scheduleModalOpen = false;
    this.justificationModalOpen = false;
  }

  saveSchedule(data: any): void {
    console.log('Schedule saved', data);
    //todo Call the backend
  }

  saveJustification(delay: number): void {
    console.log('Justification delay', delay);
    //todo Call the backend
  }

  saveThresholds(data: any): void {
    console.log('Thresholds saved', data);
    //todo Call the backend
  }
}
